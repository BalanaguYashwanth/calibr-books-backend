const mongoosastic = require("mongoosastic");
const mongoose = require("mongoose");
const { BOOKS_MODEL } = require("../contants");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title"],
    },
    author: {
      type: String,
      required: [true, "Please add the author"],
    },
    publicationYear: {
      type: Number,
      required: [true, "Please add the publication"],
    },
    isbn: {
      type: String,
      required: [true, "Please add the isbn"],
    },
    description: {
      type: String,
      required: [true, "Please add the description"],
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(mongoosastic);
module.exports = mongoose.model("book", bookSchema, BOOKS_MODEL);
