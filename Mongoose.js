import mongoose from "mongoose";
import express from "express";
import router from "./Routes/usersRoute.js";

const port = process.env.PORT || 3000;
const app = express();
const uri = "mongodb://localhost:27017/mongo";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Connection failed", error));

app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message || "Internal Server Error!" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
