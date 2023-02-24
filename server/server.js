require("dotenv").config({path: "./config.env"});
const path = require("path");
const cors = require("cors");

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/Error");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://stunning-gecko-4a513a.netlify.app"
  })
)

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/private", require("./routes/private/private"));
app.use("/api/private", require("./routes/private/account"));
app.use("/api/private", require("./routes/private/books"));
app.use("/api/private", require("./routes/private/bookshelves"));
app.use("/api/private", require("./routes/private/challenges"));
app.use("/api/private", require("./routes/private/journal"));
app.use("/api/private", require("./routes/private/reviews"));
app.use("/api/private", require("./routes/private/browse"));

app.use(errorHandler);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}
else {
  app.get("/", (req, res) => {
    res.send("API Running");
  })
}

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + "...");
});

process.on("unhandledRejection", (error, promise) => {
  console.log("Logged Error: " + error);
  server.close(() => {
    process.exit(1);
  });
});
