const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.ycombinator.com/";
axios.get(url).then(function ({ data }) {
    const $ = cheerio.load(data)
    const result = []
    $('.submission').map((i, el) => {
        const rank = $(el).find('.rank').text()
        const text = $(el).find('.title .titleline a').text()
        result[i] = { rank, text }
    })
    $('.subtext').map((i, el) => {
        const age = $(el).find('.age a').text()
        const score = $(el).find('.score').text()
        let others = result[i]
        result[i] = { ...others, age, score }
    })
    console.table(result)
});
