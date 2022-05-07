const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/learning");

const learningSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    steps: String,
    completionDate: { type: String, default: Date },
    priority: String,
    completed: Boolean,
    favorited: Boolean,
  },
  {
    timestamps: true,
  }
);

const learn = mongoose.model("Learn", learningSchema);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/learn", async (req, res) => {
  const learning = await learn
    .find({})
    .sort({ completed: "asc", createdAt: "desc", updatedAt: "desc" });
  try {
    res.status(200).json(learning);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/learn", async (req, res) => {
  const learning = new learn(req.body);
  try {
    await learning.save();
    res.send(learning);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/learn/:id", async (req, res) => {
  try {
    const learning = await learn.findById(req.params.id);
    if (!learning) res.send(404).send("No item found");
    res.status(200).json(learning);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/learn/:id", async (req, res) => {
  try {
    const learning = await learn.findByIdAndUpdate(req.params.id, req.body);
    if (!learning) res.status(404).send("No item found");
    await learning.save();
    res.status(200).send(learning);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/learn/:id", async (req, res) => {
  try {
    const learning = await learn.findByIdAndDelete(req.params.id);
    if (!learning) res.status(404).send("no item found");
    res.status(200).send("deleted item");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log("Server running on port " + port));
