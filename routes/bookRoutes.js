const express = require('express')
const { retriveAllBooks, createBook, retriveBookByID, updateBookByID, deleteBookByID } = require('../controllers/bookControllers')
const router = express.Router()

router.get('/',retriveAllBooks)
router.get('/:id', retriveBookByID)
router.post('/',createBook)
router.put('/:id',updateBookByID)
router.delete('/:id', deleteBookByID)


module.exports = router