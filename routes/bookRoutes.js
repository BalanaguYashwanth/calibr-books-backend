const express = require("express");
const {
  retriveAllBooks,
  createBook,
  retriveBookByID,
  updateBookByID,
  deleteBookByID,
  searchAPI,
} = require("../controllers/bookControllers");
const router = express.Router();

router.get("/", retriveAllBooks);
router.get("/:id", retriveBookByID);
router.post("/", createBook);
router.post("/search", searchAPI);
router.put("/:id", updateBookByID);
router.delete("/:id", deleteBookByID);

module.exports = router;
