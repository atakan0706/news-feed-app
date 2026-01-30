const express = require("express")
const router = express.Router()
const { register, login, updateInterests } = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/register", register)
router.post("/login", login)
router.put("/interests", authMiddleware, updateInterests)

module.exports = router
