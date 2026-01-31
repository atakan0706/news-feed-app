const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  savedArticles: {
    type: [{
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      publishedAt: String,
      source: mongoose.Schema.Types.Mixed,
      category: String
    }],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
