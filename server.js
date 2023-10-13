const express = require("express");
require("dotenv").config();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc =  require("swagger-jsdoc")
const bookRoutes = require("./routes/bookRoutes");
const connectDb = require("./config/dbConnection");
const connectElastic = require("./config/elasticConnection");

connectDb();
connectElastic();
const options  = {
  definition:{
    openapi:'3.0.0',
    basePath: "/api/books",
    info:{
      title:"BOOKS API",
      version:"1.0.0",
      description:"Books API"
    },
      servers:[
        {
          url:process.env.BACKEND_HOSTED_URL
        }
      ],
  },
  apis:['./routes/*.js']
}

const app = express();
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options)

app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))

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
