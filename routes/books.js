const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const Author = require("../models/authors");
const Book = require("../models/books");
const { cover_image_base_url } = require("../models/books");
const router = express.Router();
const upload_path = path.join("public", cover_image_base_url);
const image_mimetypes = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
];
const upload = multer({
  dest: upload_path,
  fileFilter: (req, file, cb) => {
    cb(null, image_mimetypes.includes(file.mimetype));
  },
});

// All books
router.get("/", async (req, res) => {
  res.render("books/index");
  // try {

  // } catch (error) {
  //   console.log(error);
  //   res.redirect("/");
  // }
});

// create a new book
router.get("/new", async (req, res) => {
  let params = {};
});

// handle new book form submission
router.post("/", upload.single("cover_image"), async (req, res) => {
  const file_name = req.file != null ? req.file.filename : null;
  const authors = await Author.find({});
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    page_count: req.body.page_count,
    description: req.body.description,
    publishedAt: new Date(req.body.publishedAt),
    cover_image: file_name,
  });
  try {
    const __book = await book.save();
    res.redirect("/books");
    // res.redirect(`/books/${__book.id}`);
  } catch (err) {
    console.error(err);
    res.render("books/new", {
      book: book,
      authors: authors,
      error_msg: "Error creating book",
    });
  }
});

let render_new_page = async (res, params) => {
  try {
    params.book = new Book({});
    const authors = await Author.find({});
    params.authors = authors;
    res.render("books/new", params);
  } catch (err) {
    console.error(err);
  }
};

// error handelling
// custom render new_page_middleware
module.exports = router;
