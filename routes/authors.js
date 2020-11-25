// authors route
const express = require("express");
const router = express.Router();
const Author = require("../models/authors");
// let search_opts;
// All authors
router.get("/", async (req, res) => {
  let search_opts = {};
  if (req.query.name != null && req.query.name != "") {
    search_opts.name = new RegExp(req.query.name, "i");
  }
  console.log(search_opts);
  try {
    const authors = await Author.find(search_opts).sort({ createdAt: -1 });
    res.render("authors/index", {
      authors: authors,
      search_opts: req.query.name,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Get a single author
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author({}) });
});

// create a new author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const __author = await author.save();
    res.redirect("/authors");
    // res.redirect(`/authors/${__author.id}`);
  } catch (err) {
    console.log(author);
    res.render("authors/new", {
      Author: author,
      error_msg: "Error creating author",
    });
  }
});

module.exports = router;
