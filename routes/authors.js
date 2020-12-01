// authors route
const express = require("express");
const router = express.Router();
const Author = require("../models/authors");
const Book = require("../models/books");

// All authors
router.get("/", async (req, res) => {
  let search_opts = {};
  if (req.query.name != null && req.query.name != "") {
    search_opts.name = new RegExp(req.query.name, "i");
  }
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

// create new  author get routes
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author({}) });
});

// create a new author post route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const __author = await author.save();
    res.redirect(`/authors/${__author.id}`);
  } catch (err) {
    console.log(author);
    res.render("authors/new", {
      author: author,
      error_msg: "Error creating author",
    });
  }
});

// SHOW SINGLE AUTHOR ROUTE
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render("authors/show", {
      author: author,
      books_by_author: books,
    });
  } catch (error) {
    res.redirect("/");
  }
});

// EDIT AUTHOR ROUTE
router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch (error) {
    console.log(error);
    res.redirect("/authors");
  }
});

// UPDATE AUTHOR ROUTE
router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch (err) {
    console.log(err);
    if (author == null) {
      res.redirect("/");
    } else {
      res.render(`authors/edit`, {
        author: author,
        error_msg: "Error Updating author",
      });
    }
  }
});

// DELETE AUTHOR ROUTE
router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect("/authors");
  } catch (error) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
