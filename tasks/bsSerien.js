const bent = require("bent");
const cheerio = require("cheerio");

let bs = bent("https://bs.to");

(async (url) => {
	let res = await bs(url);
	let $ = cheerio.load(await res.text());

	let links = $(`li[class^='e'] > a[href*='${url.match(/\/\d+\//)[0]}'][href$='/de']`).toArray();
	for (let a of links) console.log(a.attribs.href);
})("/serie/Die-Simpsons/1/1-Es-Weihnachtet-Schwer/de");
