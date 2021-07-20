const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://vodoanhoanglong:longloi123@projectshoppingcart.30wxn.mongodb.net/ProjectShoppingCart?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.get("/", (req, res) => res.send("hello world"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
