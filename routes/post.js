const express = require("express");
const postRoutes = express.Router();
// Models
const Post = require("../models/postModel");

postRoutes.route("/post")
//----- Create new post
.post((req, res) => {
  // Create post
  Post.create({
    userId: req.body.userId,
    text: req.body.text
  })
  .then(savedDoc => {
    res.json({
      success: true,
      post: savedDoc
    })
  })
  .catch(err => console.log(err));
});

postRoutes.route("/post/:id")
//----- Delete given post
.delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then(deletedDoc => {
    res.json({
      success: true,
      post: deletedDoc
    });
  })
  .catch(err => console.log(err));
});

postRoutes.route("/post/user/:userId")
//----- Retrieve all posts for given user
.get((req, res) => {
  Post.find({
    userId: req.params.userId,
  })
  .then(docs => {
    res.json({
      success: true,
      posts: docs
    });
  })
  .catch(err => console.log(err));
})
//----- Delete all posts for given user
.delete((req, res) => {
  Post.deleteMany({
    userId: req.params.userId
  })
  .then(deletedCount => {
    res.json({
      success: true,
      count: deletedCount.deletedCount
    })
  })
  .catch(err => console.log(err));
});

module.exports = postRoutes;