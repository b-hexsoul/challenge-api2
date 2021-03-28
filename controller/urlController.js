const HtmlPage = require("../models/HtmlPage");

// @desc    Extract Title and Meta:Description from url provided - Url is recieved from req.body.url;
// @route   POST /api/v1/extractHtml
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
