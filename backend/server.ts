import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connectDB } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
