const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Debug middleware (helps you see what frontend sends)
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Body:", req.body);
  next();
});

// Routes
app.use("/api/leads", require("./routes/leadroutes"));

// DB
mongoose.connect("mongodb://127.0.0.1:27017/minicrm")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));