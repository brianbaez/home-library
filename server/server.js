require("dotenv").config({path: "./config.env"});

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/Error");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/browse"));

app.use("/api/private", require("./routes/private/private"));
app.use("/api/private", require("./routes/private/books"));
app.use("/api/private", require("./routes/private/bookshelves"));
app.use("/api/private", require("./routes/private/challenges"));
app.use("/api/private", require("./routes/private/journal"));
app.use("/api/private", require("./routes/private/reviews"));

app.use(errorHandler);

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
