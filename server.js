const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000;
const { json, urlencoded } = express;
const connectDB = require("./config/db.config");
const axios = require("axios");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  const { data } = axios.get("https://www.example.com/");
});

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

connectDB();
