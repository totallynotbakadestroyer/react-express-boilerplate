import express from "express";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

let mongoURI: string;

if (process.env.MONGO_URI) {
  mongoURI = process.env.MONGO_URI;
} else {
  console.error("MONGO_URI environmental variable is not set");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "connected",
  console.log.bind(console, "Established connection with MongoDB")
);

export default app;
