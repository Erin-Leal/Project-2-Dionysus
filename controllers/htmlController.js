// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", (req, res) => {
  res.render("index", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/dashboard", isAuthenticated, (req, res) => {
  db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      res.render("dashboard", { user: req.user, posts: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

/**
 * Posted Events Page -
 * Notice loading our event posts, with that include!
 */
router.get("/postedevents", isAuthenticated, (req, res) => {
  db.EventPost.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      res.render("postedevents", { user: req.user, eventposts: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

/**
 * Generic Error Page
 */
router.get("*", (req, res) => {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
