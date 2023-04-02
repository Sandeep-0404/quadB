require("dotenv").config();
const express = require("express");
const product_route = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require("./DB/connect");
const set = require("./data");
let cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello working");
});

app.use("/api", product_route);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    set();
    app.listen(PORT, () => {
      console.log("server is set on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
