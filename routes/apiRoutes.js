const express = require("express");
const router = express.Router();
const isValidUrl = require("../middleware/isValidUrl");
const extractTitleAndMeta = require("../middleware/extractTitleAndMeta");
const { htmlExtract, getScrapedUrl } = require("../controller/urlController");

// Root path of /api/v1/scrapeHtml

router
  .route("/")
  .post(isValidUrl, extractTitleAndMeta, htmlExtract)
  .get(getScrapedUrl);

module.exports = router;
