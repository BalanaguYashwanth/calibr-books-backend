const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModels");

const retriveAllBooks = asyncHandler(async(req,res) => {
    const books = await Books.find()
    res.status(200).json(books)
})

const retriveBookByID = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const book = await Books.find({_id:id})
    return res.status(200).json(book)
})

const createBook = asyncHandler(async(req, res)=>{
    const {title,author,publicationYear,isbn,description} = req.body;
    const books = await Books.create({title,author,publicationYear,isbn,description})
    res.status(201).json(books)
})

const updateBookByID = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {title, description,author, publicationYear,isbn} = req.body;
    const updatedBook = await Books.updateOne({_id:id},{$set:{title,description,author,publicationYear,isbn}})
    res.status(200).json(updatedBook)
})

const deleteBookByID = asyncHandler(async(req,res)=>{
    const {id} = req.params
    await Books.deleteOne({_id:id})
    res.status(200).json({'message':`deleted successfully id - ${id}`})
})

module.exports = {
    retriveAllBooks,
    createBook,
    retriveBookByID,
    updateBookByID,
    deleteBookByID
}