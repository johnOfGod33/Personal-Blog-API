const { Schema, model, SchemaType } = require("mongoose");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: SchemaType.ObjectId,
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
  imageUrl: { type: String, required: true },
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
