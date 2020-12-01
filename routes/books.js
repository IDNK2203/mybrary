const express = require("express");
const Author = require("../models/authors");
const Book = require("../models/books");
const router = express.Router();
const image_mimetypes = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
];

// All books

router.get("/", async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.published_before != null && req.query.published_before != "") {
    query = query.lte("publishedAt", req.query.published_before);
  }
  if (req.query.published_after != null && req.query.published_after != "") {
    query = query.gte("publishedAt", req.query.published_after);
  }
  try {
    const books = await query.exec();
    let search_opts = req.query;
    res.render("books/index", { books, search_opts });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// create a new book
router.get("/new", async (req, res) => {
  render_new_page(res, new Book({}));
});

// handle new book form submission
router.post("/", async (req, res) => {
  const authors = await Author.find({});
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    page_count: req.body.page_count,
    description: req.body.description,
    publishedAt: new Date(req.body.publishedAt),
  });
  save_image_cover(book, req.body.cover_image);

  try {
    const __book = await book.save();
    res.redirect("/books");
    // res.redirect(`/books/${__book.id}`);
  } catch (err) {
    console.error(err);

    render_new_page(res, book, true);
  }
});

let render_new_page = async (res, book, hasError = false) => {
  let params = {};
  try {
    params.book = book;
    const authors = await Author.find({});
    params.authors = authors;
    if (hasError) params.error_msg = "Error creating book";
    res.render("books/new", params);
  } catch (err) {
    console.error(err);
  }
};

let save_image_cover = (book, cover_image) => {
  if (cover_image == null) {
    return;
  }
  const image_obj = JSON.parse(cover_image);
  if (image_obj != null && image_mimetypes.includes(image_obj.type)) {
    book.cover_image = new Buffer.from(image_obj.data, "base64");
    book.cover_image_type = image_obj.type;
  }
};

module.exports = router;
