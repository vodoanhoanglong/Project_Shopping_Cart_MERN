require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const verifyToken = require("./middleware/auth");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const favoritesRouter = require("./routes/favorites");
const ratingRouter = require("./routes/rating");
const contactRouter = require("./routes/contact");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@projectshoppingcart.30wxn.mongodb.net/ProjectShoppingCart?retryWrites=true&w=majority`,
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
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/rating", ratingRouter);
app.use("/user", verifyToken, userRouter);
app.use("/product_action", productRouter);
app.use("/cart", cartRouter);
app.use("/favorites", verifyToken, favoritesRouter);
app.use("/contact", contactRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
