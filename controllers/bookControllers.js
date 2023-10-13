const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModels");
const connectElastic = require("../config/elasticConnection");
const {
  createIndex,
  updateIndex,
  deleteIndex,
} = require("./ElasticControllers");
const { BOOKS_MODEL } = require("../contants");

const retriveAllBooks = async (req, res) => {
  try{
    const { skip, limit } = req.query;
    let books;
    if (skip || limit) {
      books = await Books.find().skip(skip).limit(limit);
    } else {
      books = await Books.find();
    }
    const length = await Books.find({}).count()
    res.status(200).json({ response: books, count:length });
  }catch(error){
    res.status(500).json({ error:error||'something went wrong' });
  }
};

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
          operator: "and",
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
    res.status(500).json({ error:error||'something went wrong' });
  }
};

const updateBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contents = req.body;
  const updatedBook = await Books.updateOne({ _id: id }, { $set: contents });
  await updateIndex({ id, contents });
  res.status(200).json(updatedBook);
});

const deleteBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Books.deleteOne({ _id: id });
  await deleteIndex({ id });
  res.status(200).json({ response: `deleted successfully id - ${id}` });
});

module.exports = {
  retriveAllBooks,
  createBook,
  retriveBookByID,
  updateBookByID,
  deleteBookByID,
  searchAPI,
};
