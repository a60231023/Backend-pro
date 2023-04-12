require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie and file middleware
app.use(cookieParser());
app.use(fileUpload());

//morgan middleware
app.use(morgan("tiny"));

//import all the routes here
const home = require("./routes/home");

//router middleware
app.use("/api/v1", home);

module.exports = app;