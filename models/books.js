const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: Buffer,
      required: true,
    },
    cover_image_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

BookSchema.virtual("cover_image_path").get(function () {
  if (this.cover_image != null && this.cover_image_type != null) {
    return `data:${
      this.cover_image_type
    };charset=utf-8;base64,${this.cover_image.toString("base64")}`;
  }
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;
