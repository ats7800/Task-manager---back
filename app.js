const connectDB = require("./db/connect");
const express = require("express");
const app = express();
// const cors = require("cors");
const tasksRoute = require("./routes/tasks");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// required for testing - cross origin
// app.use(cors({ origin: "http://localhost:3002" }));
app.use("/api/v1/tasks", tasksRoute);

const port = 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log("connected to the DB")
    );
    app.listen(port, () => {
      console.log("listening to " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
// GET 'api/v1/tasks' -
// POST 'api/v1/tasks -
// GET 'api/v1/tasks/:id -
// PATCH 'api/v1/tasks/:id -
// DELETE 'api/v1/tasks/:id -
