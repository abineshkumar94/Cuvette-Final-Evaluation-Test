const express = require("express");
const app = express();
const mongoDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// This will allow all CORS requests
app.use(cors());

// preflight request
app.options("*", cors());

// Access-Control-Allow-Origin
// origin: ["https://swip-troy-frontend.vercel.app"],

app.use(
  cors({
    origin: "*",
    methods: ["post", "get", "put", "delete"],
    "Access-Control-Allow-Credentials": true,
  })
);

// ? Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const fileUpload = require("express-fileupload");

require("dotenv").config();
mongoDB();

// Import all routes here
const user = require("./routes/user");
const stories = require("./routes/stories");

// Router Middleware
app.use("/api/v1/", user);
app.use("/api/v1/stories/", stories);

const port = process.env.PORT || 4000;
app.listen(port, console.log("server is running at " + port, "..."));

// Health api
app.get("/health", (req, res) => {
  res.status(200);
  console.log("Health is good");
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Home</h1>");
});
