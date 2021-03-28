const HtmlPage = require("../models/HtmlPage");
const isValidUrl = require("valid-url");
const { isHttpsUri, isHttpUri } = isValidUrl;

// @desc    Extract Title and Meta:Description from url provided - Url is recieved from req.body.url;
// @route   POST /api/v1/scrapeHtml
// @access  Public
exports.htmlExtract = async (req, res, next) => {
  // Check if URL exists, if it does then increases the count and will return data.
  const entry = await HtmlPage.findOne({ url: req.body.url });

  if (!entry) {
    req.new = true;
    let newDoc = await HtmlPage.create({ url: req.body.url });

    let { _id: id, url, createdAt } = newDoc;
    res.status(200).json({ id, url, createdAt });
  }

  if (entry) {
    req.new = false;
    let { _id: id, url, createdAt } = entry;
    res.status(200).json({ id, url, createdAt });
  }
};

// @desc    Return scraped data to the user from a given id or url - recieved through req.body
// @route   GET /api/v1/scrapeHtml/
// @access  Public
exports.getScrapedUrl = async (req, res, next) => {
  // if Url is included, check if it is a valid url first.
  if (req.body.url) {
    let url = req.body.url;
    if (isHttpUri(url) || isHttpsUri(url)) {
      // Check if url exists in db.
      const entry = await HtmlPage.findOne({ url: url });

      if (!entry) {
        return res.status(400).json({ error: "Could not find data" });
      }

      if (entry) {
        let { _id: id, url, html, createdAt } = entry;
        return res.status(200).json({ id, url, html, createdAt });
      }
    }
  }

  // If id is included search with Id.
  if (req.body.id) {
    // search db for id
    const entry = await HtmlPage.findOne({ _id: req.body.id });

    if (!entry) {
      return res.status(400).json({ error: "Could not find data" });
    }

    if (entry) {
      let { _id: id, url, html, createdAt } = entry;
      return res.status(200).json({ id, url, html, createdAt });
    }
  }
};
