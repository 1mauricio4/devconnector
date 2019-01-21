const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");
// Load User Model
const User = require("../../models/User");

// Load Input Validatoin
const validatePostInput = require("../../validation/post");
const validateCommmentsInput = require("../../validation/comments");

// @route  GET api/posts
// @desc   Get posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

// @route  GET api/posts/:post_id
// @desc   Get single post
// @access Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
});

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route  DELETE api/posts/:post_id
// @desc   Delete single post
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: "Not authorized user!!!" });
        }
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ nopost: "No post found" }));
  }
);

// @route  POST api/posts/like/:id
// @desc   Like post
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/posts/unlike/:id
// @desc   Unlike post
// @access Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You have not liked this post" });
      }

      // get removed index
      const findRemoveIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user._id);
      // remove like from likes array and save adjusted post
      post.likes.splice(findRemoveIndex, 1);
      post.save().then(post => res.json(post));
    });
  }
);

// @route  POST api/posts/comment
// @desc   Comment on post
// @access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommmentsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id).then(post => {
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
      };

      // Add to comments array
      post.comments.unshift(newComment);
      // save adjusted post
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route  DELETE api/posts/comment/:post_id/:com_id
// @desc   Delete comment on post
// @access Private
router.delete(
  "/comment/:post_id/:com_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Post.findById(req.params.post_id)
      .then(post => {
        // check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.com_id
          ).length === 0
        ) {
          errors.comments = "Comment doesn't exists";
          return res.status(404).json(errors);
        }

        // find index of removed comment
        const findRemoveIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.com_id);

        // remove from comments array
        post.comments.splice(findRemoveIndex, 1);
        // save updated post
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
