const express = require("express");
const router = express.Router();
const isValidUrl = require("../middleware/isValidUrl");
const extractTitleAndMeta = require("../middleware/extractTitleAndMeta");
const { htmlExtract } = require("../controller/urlController");

// Root path of /api/v1/extract
// Uses isValidUrl and extractTitleAndMeta Middleware:
router.route("/").post(isValidUrl, extractTitleAndMeta, htmlExtract);

module.exports = router;
