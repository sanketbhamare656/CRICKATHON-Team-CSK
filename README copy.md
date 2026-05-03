# IPL Pulse Platform 🏏✨

IPL Pulse is a professional, multi-page sports portal designed for the modern cricket fan. It combines real-time data scraping, AI-driven match analytics, and global news integration into a sleek, premium web experience.

## 🚀 Features

- **Animated Homepage**: A stunning landing page with glassmorphism design and smooth entry transitions.
- **Pro-Level Scoreboard**: 
  - Real-time score updates for **SRH vs KKR**.
  - **AI Match Analytics**: Automated derive RR, RRR, and match scenarios.
  - **Visual Data**: Score progression line charts and run distribution donut charts.
  - **Deep Stats**: Ball-by-ball tracker, Fall of Wickets, and playing XI rosters.
- **News Room**: An automated background agent that scrapes the latest IPL headlines from Google News every 5 minutes.
- **AI Chat Guru**: A dedicated chatbot powered by Gemini Flash for discussing IPL history, tactics, and match insights.

## 🛠️ Technology Stack

- **Backend**: FastAPI (Python)
- **AI Engine**: Google Gemini Flash (Generative AI)
- **Frontend**: Native HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Charts**: Chart.js
- **Scraping**: BeautifulSoup4 & HTTPX

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd score
   ```

2. **Install dependencies**:
   ```bash
   pip install fastapi uvicorn httpx beautifulsoup4 google-generativeai
   ```

3. **Configure API Key**:
   Ensure your Gemini API key is configured in `main.py`.

4. **Run the Platform**:
   ```bash
   python main.py
   ```

## 🌐 Navigation

- `http://127.0.0.1:8000/` - Homepage
- `http://127.0.0.1:8000/live-score` - Pro Dashboard
- `http://127.0.0.1:8000/news` - IPL Headlines
- `http://127.0.0.1:8000/chatbot` - AI Chat Guru

---
Built with ❤️ for the IPL 2026 Season.
