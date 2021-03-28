const scrapeHtml = require("../utils/scrapeHtml");

const extractTitleAndMeta = (req, res, next) => {
  // Set up event listener for response 'finish'
  res.on("finish", async () => {
    // Check if new db entry was created
    if (req.new) {
      // Extract title and meta description
      scrapeHtml(req.body.url);
    } else {
      console.log("Url already in database with info extracted");
    }
  });

  // Continue on to controller
  next();
};

module.exports = extractTitleAndMeta;
