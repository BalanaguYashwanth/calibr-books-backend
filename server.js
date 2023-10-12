const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const connectDb = require("./config/dbConnection");
const connectElastic = require("./config/elasticConnection");

connectDb();
connectElastic();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "healty" });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(`Error occured ${error}`);
  }
});
