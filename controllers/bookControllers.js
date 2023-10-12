const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModels");
const connectElastic = require("../config/elasticConnection");
const {createIndex,updateIndex, deleteIndex} = require("./ElasticControllers");
const { BOOKS_MODEL } = require("../contants");

const retriveAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find();
  res.status(200).json(books);
});

const retriveBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Books.find({ _id: id });
  return res.status(200).json(book);
});

const searchAPI = asyncHandler(async (req, res) => {
  const { contents } = req.body;
  const client = connectElastic();
  const body = await client.search({
    index: BOOKS_MODEL,
    body: {
      query: {
        multi_match: {
          query: contents,
          fields: ["title", "author", "description"],
        },
      },
    },
  });
  const searchResponse = body?.hits?.hits;
  return res.json({ response: searchResponse });
});

const createBook = async (req, res) => {
  try {
    const { title, author, publicationYear, isbn, description } = req.body;
    const books = await Books.create({
      title,
      author,
      publicationYear,
      isbn,
      description,
    });
    const id = books?._id;
    await createIndex({
      id,
      title,
      author,
      publicationYear,
      isbn,
      description,
    });
    res.status(201).json(books);
  } catch (error) {
    console.log("error==", error);
    res.status(201).json({ error: "something went wrong" });
  }
};

const updateBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contents = req.body;
  const updatedBook = await Books.updateOne(
    { _id: id },
    { $set: contents }
  );
  await updateIndex({id,contents})
  res.status(200).json(updatedBook);
});

const deleteBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Books.deleteOne({ _id: id });
  await deleteIndex({id})
  res.status(200).json({ message: `deleted successfully id - ${id}` });
});

module.exports = {
  retriveAllBooks,
  createBook,
  retriveBookByID,
  updateBookByID,
  deleteBookByID,
  searchAPI,
};
