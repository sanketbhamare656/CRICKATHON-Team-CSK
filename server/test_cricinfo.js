const axios = require('axios');
const fs = require('fs');

axios.get('https://www.espncricinfo.com/live-cricket-score', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}).then(res => {
    fs.writeFileSync('cricinfo_live.html', res.data);
    console.log("Downloaded Cricinfo HTML to cricinfo_live.html. Length:", res.data.length);
}).catch(err => {
    console.error("Error fetching Cricinfo:", err.message);
});
