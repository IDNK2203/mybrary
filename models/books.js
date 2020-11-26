const mongoose = require("mongoose");
const path = require("path");
const Schema = mongoose.Schema;

const cover_image_base_url = "/uploads/book-covers";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    page_count: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    cover_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

BookSchema.virtual("cover_image_path" ).get(function () {
  if(this.cover_image != null){
    return path.join("/", cover_image_base_url, this.cover_image);
  }
})

const Book = mongoose.model("book", BookSchema);

module.exports = Book;
module.exports.cover_image_base_url = cover_image_base_url;
