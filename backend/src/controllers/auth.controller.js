const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password)
      return res.status(400).json({ message: "Kullanıcı adı, email ve şifre zorunlu" })

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: "Kullanıcı zaten var" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    console.log("Yeni kullanıcı oluşturuldu:", user.email)
    res.status(201).json({ message: "Kayıt başarılı" })
  } catch (err) {
    console.error("Register hatası:", err)
    res.status(500).json({ message: "Server hatası" })
  }
}

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "Kullanıcı bulunamadı" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Şifre yanlış" })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        interests: user.interests
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Server hatası" })
  }
}

// UPDATE INTERESTS
exports.updateInterests = async (req, res) => {
  try {
    const { interests } = req.body

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: "İlgi alanları geçersiz" })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { interests },
      { new: true }
    ).select("-password")

    console.log("İlgi alanları güncellendi:", user.email, interests)

    res.json({
      message: "İlgi alanları güncellendi",
      user: {
        username: user.username,
        email: user.email,
        interests: user.interests
      }
    })
  } catch (err) {
    console.error("İlgi alanları güncelleme hatası:", err)
    res.status(500).json({ message: "Server hatası" })
  }
}
