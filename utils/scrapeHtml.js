const cheerio = require("cheerio");
const axios = require("axios");
const HtmlPage = require("../models/HtmlPage");

const scrapeHtml = async (url) => {
  const { data } = await axios.get(url);
  let $ = cheerio.load(data);
  let title = $("title").text();
  let meta_desc = $("meta[name='description']").attr("content");
  console.log(title, meta_desc);

  // Locate created document and update with scrapped title and meta_desc
  const doc = await HtmlPage.findOneAndUpdate(
    { url: url },
    { html: { title: title || null, meta_desc: meta_desc || null } },
    { returnOriginal: false }
  );

  console.log(doc);
};

module.exports = scrapeHtml;
