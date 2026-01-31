const express = require("express")
const router = express.Router()
const { register, login, updateInterests, saveArticle, unsaveArticle, getSavedArticles } = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/register", register)
router.post("/login", login)
router.put("/interests", authMiddleware, updateInterests)
router.get("/saved", authMiddleware, getSavedArticles)
router.post("/saved", authMiddleware, saveArticle)
router.delete("/saved", authMiddleware, unsaveArticle)

module.exports = router
