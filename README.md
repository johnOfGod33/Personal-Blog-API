# PERSONAL BLOG API

A RESTful API that would power a personal blog

# FEATURES

- User authentication and authorization (sign up and login)

- Post new article

- Post comment

- Get articles (published or draft)

- Update article

- Delete article

# TECH

- Node js
- Express js
- MongoDB

# Database Schema

### `users collection`

```json
{
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}
```

### `articles collection`

```json
{
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
}
```

# Setting Up Locally

coming soon

# Docs

coming soon
