const router = require("express").Router();
const { getNews } = require("../controllers/news.controller");

// Frontend api.get("/news?category=...") dediği için burada GET tanımlıyoruz
router.get("/", getNews); 

module.exports = router;