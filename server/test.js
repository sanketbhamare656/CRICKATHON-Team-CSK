const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('cricbuzz.html'));

let score = "0/0";
let overs = "0.0";
let matchText = "";

$('a[title*="Sunrisers Hyderabad vs Kolkata Knight Riders"]').each((i, el) => {
    const text = $(el).text();
    if (text.includes('SRH') && text.includes('KKR')) {
        matchText = text;
    }
});

// matchText might be: "45th Match • Hyderabad, Rajiv Gandhi International StadiumSunrisers HyderabadSRH2-0 (0.3)Kolkata Knight RidersKKRSunrisers Hyderabad opt to bat"
const scoreMatch = matchText.match(/(\d+-\d+)\s*\((\d+\.\d+)\)/);
if (scoreMatch) {
    score = scoreMatch[1].replace('-', '/'); // Convert 2-0 to 2/0
    overs = scoreMatch[2];
}

console.log("SCORE:", score);
console.log("OVERS:", overs);
