import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8282;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//dbconnect
import { mongoConnect } from "./src/dbconfig/db.js";
mongoConnect();

//api
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";
import morgan from "morgan";

app.use("/api/store/user", userRouter);
app.use("/api/store/product", productRouter);
//
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server up and running",
  });
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server running at port:${PORT}`);
});
