const axios = require('axios');
const cheerio = require('cheerio');

async function testParse() {
  const url = "https://www.espncricinfo.com/series/ipl-2026-1510719/sunrisers-hyderabad-vs-kolkata-knight-riders-45th-match-1529288/full-scorecard";
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const script = $('#__NEXT_DATA__').html();
    if (script) {
      const data = JSON.parse(script);
      console.log("Found __NEXT_DATA__!");
      // Inspect match content
      const match = data.props.pageProps.matchContent;
      console.log("Match Title:", match.match.title);
      console.log("Current Score:", match.match.score);
    } else {
      console.log("No __NEXT_DATA__ found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testParse();
