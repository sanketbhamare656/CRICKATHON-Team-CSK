import json
import asyncio
import httpx
import logging
import google.generativeai as genai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup
from contextlib import asynccontextmanager

# --- CONFIGURATION ---
GEMINI_API_KEY = "AIzaSyAT0ms4hX65AWTxdUS70vPN9BuJyC-YCcs"
TARGET_URL = "https://www.cricbuzz.com/live-cricket-scores/151998/srh-vs-kkr-45th-match-indian-premier-league-2026"
NEWS_URL = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
JSON_FILE = "match_data.json"
NEWS_FILE = "news_data.json"
REFRESH_INTERVAL = 30 

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-3-flash-preview')

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("IPL_Pulse")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start background agents
    asyncio.create_task(score_scraping_agent())
    asyncio.create_task(news_scraping_agent())
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

# --- AGENTS ---

async def score_scraping_agent():
    last_raw_text = ""
    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        while True:
            try:
                headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
                response = await client.get(TARGET_URL, headers=headers)
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    body_content = soup.body if soup.body else soup
                    raw_text = body_content.get_text(separator=' ', strip=True)[:8000]

                    if raw_text != last_raw_text:
                        last_raw_text = raw_text
                        prompt = f"""
                        Extract deep live cricket analytics from this text. 
                        TODAY'S MATCH: SRH vs KKR (IPL 2026).
                        
                        CRITICAL INSTRUCTIONS:
                        1. You MUST return the FULL JSON schema provided below. Do not omit any keys.
                        2. If data like 'Captain' or 'Stadium' is missing, use your internal knowledge for SRH/KKR.
                        3. Calculate RR/Balls left manually if not found.
                        
                        Text to analyze: {raw_text}
                        
                        Schema: {{
                            "match_info": {{"status": "LIVE", "stadium": "Rajiv Gandhi International Stadium", "venue_info": "Pitch: Batting friendly", "live_over": "N.N", "team1": {{"name": "Sunrisers Hyderabad", "short": "SRH", "runs": "N", "wkts": "N", "overs": "N", "captain": "Pat Cummins"}}, "team2": {{"name": "Kolkata Knight Riders", "short": "KKR", "runs": "N", "wkts": "N", "overs": "N", "captain": "Shreyas Iyer", "status": "Yet to bat"}}}},
                            "team1_xi": ["Player1", "Player2", "..."],
                            "team2_xi": ["Player1", "Player2", "..."],
                            "win_prob": {{"team1": int, "team2": int, "crr": float, "rrr": float, "runs_needed": int, "balls_left": int}},
                            "batting": [{{"name": "Player", "runs": int, "balls": int, "fours": int, "sixes": int, "sr": float, "is_striker": bool}}],
                            "partnership": {{"runs": int, "balls": int}},
                            "bowling": [{{"name": "Player", "overs": float, "runs": int, "wkts": int, "eco": float, "speed": int, "swing": {{"in": int, "out": int}}, "is_active": bool}}],
                            "ball_history": [{{"over": int, "bowler": "Name", "balls": [], "total": int}}],
                            "fow": [{{"num": int, "name": "Player", "score": "R(B)", "over": float}}],
                            "score_history": [{{"over": int, "runs": int}}],
                            "run_dist": {{"dots": int, "ones": int, "fours": int, "sixes": int}},
                            "ai_insight": "Witty summary"
                        }}
                        """
                        ai_response = await asyncio.to_thread(model.generate_content, prompt)
                        clean_json = ai_response.text.replace('```json', '').replace('```', '').strip()
                        ai_data = json.loads(clean_json)

                        full_data = {
                            "match_info": {
                                "status": "Live Match", 
                                "stadium": "Rajiv Gandhi International Stadium", 
                                "venue_info": "Hyderabad • Pitch is fast", 
                                "live_over": "0.0", 
                                "team1": {"name": "Sunrisers Hyderabad", "short": "SRH", "runs": "0", "wkts": "0", "overs": "0.0", "captain": "Pat Cummins"}, 
                                "team2": {"name": "Kolkata Knight Riders", "short": "KKR", "runs": "0", "wkts": "0", "overs": "0.0", "captain": "Shreyas Iyer", "status": "Yet to bat"}
                            },
                            "team1_xi": ["Travis Head", "Abhishek Sharma", "Aiden Markram", "Nitish Reddy", "Heinrich Klaasen", "Abdul Samad", "Shahbaz Ahmed", "Pat Cummins", "B. Kumar", "M. Markande", "T. Natarajan"],
                            "team2_xi": ["Phil Salt", "Sunil Narine", "A. Raghuvanshi", "Shreyas Iyer", "Venkatesh Iyer", "Rinku Singh", "Andre Russell", "Ramandeep Singh", "Mitchell Starc", "V. Chakaravarthy", "Harshit Rana"],
                            "win_prob": {"team1": 50, "team2": 50, "crr": 0.0, "rrr": 0.0, "runs_needed": 0, "balls_left": 0},
                            "batting": [
                                {"name": "Travis Head", "runs": 0, "balls": 0, "fours": 0, "sixes": 0, "sr": 0.0, "is_striker": True},
                                {"name": "Abhishek Sharma", "runs": 0, "balls": 0, "fours": 0, "sixes": 0, "sr": 0.0, "is_striker": False}
                            ],
                            "partnership": {"runs": 0, "balls": 0}, 
                            "bowling": [
                                {"name": "Vaibhav Arora", "overs": 3.0, "runs": 25, "wkts": 1, "eco": 8.33, "speed": 138, "swing": {"in": 60, "out": 40}, "is_active": True},
                                {"name": "Kartik Tyagi", "overs": 4.0, "runs": 30, "wkts": 2, "eco": 7.5, "speed": 145, "swing": {"in": 30, "out": 70}, "is_active": False}
                            ],
                            "ball_history": [], 
                            "fow": [], 
                            "score_history": [{"over": 1, "runs": 12}, {"over": 2, "runs": 24}, {"over": 3, "runs": 38}], 
                            "run_dist": {"dots": 10, "ones": 15, "fours": 8, "sixes": 4}, 
                            "ai_insight": "SRH vs KKR: A high-octane battle in Hyderabad!"
                        }

                        def update_data(target, source):
                            for key, value in source.items():
                                if isinstance(value, dict) and key in target: 
                                    update_data(target[key], value)
                                elif isinstance(value, list) and value: 
                                    target[key] = value
                                elif value is not None and value != "" and value != 0: 
                                    target[key] = value
                        
                        update_data(full_data, ai_data)
                        with open(JSON_FILE, "w") as f: 
                            json.dump(full_data, f, indent=4)
                        logger.info("Agent: Score Updated.")

            except Exception as e: logger.error(f"Score Agent Error: {e}")
            await asyncio.sleep(REFRESH_INTERVAL)

async def news_scraping_agent():
    """Scrapes Google News for IPL headlines every 5 minutes."""
    while True:
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                headers = {"User-Agent": "Mozilla/5.0"}
                response = await client.get(NEWS_URL, headers=headers)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    articles = []
                    # Simple heuristic for Google News structure
                    links = soup.find_all('a', href=True)
                    for link in links:
                        text = link.get_text().strip()
                        href = link['href']
                        if len(text) > 30 and ("IPL" in text or "Cricket" in text or "match" in text.lower()):
                            full_url = "https://news.google.com" + href[1:] if href.startswith("./") else href
                            if not any(a['title'] == text for articles_list in [articles] for a in articles_list):
                                articles.append({"title": text, "link": full_url, "source": "Google News"})
                    
                    with open(NEWS_FILE, "w") as f: json.dump(articles[:15], f, indent=4)
                    logger.info(f"Agent: Fetched {len(articles[:15])} News Headlines.")
        except Exception as e: logger.error(f"News Agent Error: {e}")
        await asyncio.sleep(300) # 5 minutes

# --- ROUTES ---

# Initialize match_data.json on startup so UI is never empty
INITIAL_DATA = {
    "match_info": {
        "status": "Innings Break", 
        "stadium": "Rajiv Gandhi International Stadium", 
        "venue_info": "Hyderabad • Toss: SRH (Batting)", 
        "live_over": "18.6", 
        "team1": {"name": "Sunrisers Hyderabad", "short": "SRH", "runs": "165", "wkts": "10", "overs": "18.6", "captain": "Pat Cummins"}, 
        "team2": {"name": "Kolkata Knight Riders", "short": "KKR", "runs": "0", "wkts": "0", "overs": "0.0", "captain": "Shreyas Iyer", "status": "Innings Break"}
    },
    "team1_xi": ["Travis Head", "Abhishek Sharma", "Aiden Markram", "Nitish Reddy", "Heinrich Klaasen", "Abdul Samad", "Shahbaz Ahmed", "Pat Cummins", "B. Kumar", "M. Markande", "T. Natarajan"],
    "team2_xi": ["Phil Salt", "Sunil Narine", "A. Raghuvanshi", "Shreyas Iyer", "Venkatesh Iyer", "Rinku Singh", "Andre Russell", "Ramandeep Singh", "Mitchell Starc", "V. Chakaravarthy", "Harshit Rana"],
    "win_prob": {"team1": 32, "team2": 68, "crr": 8.68, "rrr": 8.3, "runs_needed": 166, "balls_left": 120},
    "batting": [
        {"name": "Eshan Malinga", "runs": 2, "balls": 6, "fours": 0, "sixes": 0, "sr": 33.33, "is_striker": True},
        {"name": "Harshal Patel", "runs": 6, "balls": 5, "fours": 1, "sixes": 0, "sr": 120.0, "is_striker": False}
    ],
    "partnership": {"runs": 9, "balls": 11}, 
    "bowling": [
        {"name": "Vaibhav Arora", "overs": 3.0, "runs": 25, "wkts": 1, "eco": 8.33, "speed": 138, "swing": {"in": 60, "out": 40}, "is_active": True},
        {"name": "Kartik Tyagi", "overs": 4.0, "runs": 30, "wkts": 2, "eco": 7.5, "speed": 145, "swing": {"in": 30, "out": 70}, "is_active": False}
    ],
    "ball_history": [
        {"over": 19, "bowler": "Kartik Tyagi", "balls": ["4", "0", "1", "0", "1", "W"], "total": 6},
        {"over": 18, "bowler": "Vaibhav Arora", "balls": ["W", "0", "0", "Wd", "1", "1", "0"], "total": 3},
        {"over": 17, "bowler": "Sunil Narine", "balls": ["1", "W", "0", "W", "0", "0"], "total": 1},
        {"over": 16, "bowler": "Andre Russell", "balls": ["6", "W", "1", "0", "4", "W"], "total": 11}
    ], 
    "fow": [
        {"num": 10, "name": "Harshal Patel", "score": "6(5)", "over": 18.6},
        {"num": 9, "name": "Pat Cummins", "score": "1(4)", "over": 18.4},
        {"num": 8, "name": "B. Kumar", "score": "0(2)", "over": 17.3}
    ], 
    "score_history": [
        {"over": 1, "runs": 12}, {"over": 2, "runs": 24}, {"over": 3, "runs": 32}, {"over": 4, "runs": 40}, {"over": 5, "runs": 48},
        {"over": 6, "runs": 55}, {"over": 7, "runs": 64}, {"over": 8, "runs": 72}, {"over": 9, "runs": 81}, {"over": 10, "runs": 92},
        {"over": 11, "runs": 102}, {"over": 12, "runs": 110}, {"over": 13, "runs": 118}, {"over": 14, "runs": 128}, {"over": 15, "runs": 135},
        {"over": 16, "runs": 146}, {"over": 17, "runs": 147}, {"over": 18, "runs": 159}, {"over": 19, "runs": 165}
    ], 
    "run_dist": {"dots": 42, "ones": 58, "fours": 14, "sixes": 8}, 
    "ai_insight": "KKR's death bowling was a masterclass. SRH were 135/3 in the 15th over but lost 7 wickets for 30 runs in just 24 balls. Sunil Narine (4-0-22-2) and Kartik Tyagi (4-0-30-2) were the game-changers."
}

try:
    with open(JSON_FILE, "w") as f:
        json.dump(INITIAL_DATA, f, indent=4)
except Exception as e:
    logger.error(f"Startup init error: {e}")

INITIAL_NEWS = [
    {"title": "SRH vs KKR: Head and Abhishek set to unleash carnage at Uppal", "link": "#", "source": "IPL Pulse"},
    {"title": "Mitchell Starc's record price tag under scrutiny as KKR face SRH test", "link": "#", "source": "IPL Pulse"},
    {"title": "Pat Cummins: 'We're not just here to play, we're here to dominate'", "link": "#", "source": "IPL Pulse"},
    {"title": "KKR's spin twin strategy: Narine and Varun ready for Hyderabad heat", "link": "#", "source": "IPL Pulse"},
    {"title": "IPL 2026: Why the Orange Cap race is heating up early this season", "link": "#", "source": "IPL Pulse"}
]

try:
    with open(NEWS_FILE, "w") as f:
        json.dump(INITIAL_NEWS, f, indent=4)
except Exception as e:
    logger.error(f"News init error: {e}")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/live-score")
async def live_score_page(request: Request):
    return templates.TemplateResponse("scoreboard.html", {"request": request})

@app.get("/news")
async def news_page(request: Request):
    return templates.TemplateResponse("news.html", {"request": request})

@app.get("/chatbot")
async def chatbot_page(request: Request):
    return templates.TemplateResponse("chatbot.html", {"request": request})

@app.get("/api/match-data")
async def get_match_data():
    try:
        with open(JSON_FILE, "r") as f: return json.load(f)
    except: return {"error": "No data available"}

@app.get("/api/news")
async def get_news_data():
    try:
        with open(NEWS_FILE, "r") as f: return json.load(f)
    except: return []

@app.post("/api/chat")
async def chat_with_ai(data: dict):
    user_msg = data.get("message", "")
    if not user_msg: return {"reply": "Please say something!"}
    
    try:
        chat_prompt = f"You are an IPL Cricket Guru. Be witty, knowledgeable, and passionate about the IPL. User says: {user_msg}"
        response = await asyncio.to_thread(model.generate_content, chat_prompt)
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"Sorry, my cricket brain is a bit fuzzy: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)