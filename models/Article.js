const { Schema, model, SchemaTypes } = require("mongoose");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  creationDate: {
    type: Date,
    default: () => Date.now(),
  },
  updateDate: Date,
  description: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  imageUrl: { type: String, default: "" },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  unlike: {
    type: Number,
    default: 0,
  },
  tags: [String],
  Comments: [
    {
      username: String,
      email: String,
      comment: String,
    },
  ],
});

const Article = model("Article", articleSchema);

module.exports = Article;
