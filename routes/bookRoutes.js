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

/**
 * @openapi
 * '/api/books':
 *  get:
 *     summary: Fetches all books
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publicationYear:
 *                     type: number
 *                   isbn:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   __v:
 *                     type: number
 */
router.get("/", retriveAllBooks);

/**
 * @openapi
 * '/api/books/:id':
 *  get:
 *     summary: Fetches specific book by ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  author:
 *                    type: string
 *                  publicationYear:
 *                    type: number
 *                  isbn:
 *                    type: string
 *                  description:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *                  __v:
 *                    type: number
 */
router.get("/:id", retriveBookByID);

/**
 * @openapi
 * '/api/books':
 *  post:
 *     summary: Create new book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - author
 *              - publicationYear
 *              - isbn
 *              - description
 *            properties:
 *              title:
 *                 type: string
 *              author:
 *                 type: string
 *              publicationYear:
 *                 type: number
 *              isbn:
 *                 type: string
 *              description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  author:
 *                    type: string
 *                  publicationYear:
 *                    type: number
 *                  isbn:
 *                    type: string
 *                  description:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *                  __v:
 *                    type: number
 */

router.post("/", createBook);

/**
 * @openapi
 * '/api/books/search':
 *  post:
 *     summary: Get search results
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - contents
 *            properties:
 *              contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publicationYear:
 *                     type: number
 *                   isbn:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   __v:
 *                     type: number
 */
router.post("/search", searchAPI);

/**
 * @openapi
 * '/api/books/:id':
 *  put:
 *     summary: Updates specific book by ID
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - contents
 *            properties:
 *              contents:
 *                 type: object
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  acknowledged:
 *                    type: boolean
 *                  title:
 *                    type: string
 *                  modifiedCount:
 *                    type: number
 *                  upsertedId:
 *                    type: string
 *                  upsertedCount:
 *                    type: number
 *                  matchedCount:
 *                    type: number
 */

router.put("/:id", updateBookByID);

/**
 * @openapi
 * '/api/books/:id':
 *  delete:
 *     summary: Delete specific book by ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

router.delete("/:id", deleteBookByID);

module.exports = router;
