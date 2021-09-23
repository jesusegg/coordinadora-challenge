import express from "express";
import morgan from "morgan";
import challenge from "./routes/index";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", challenge);

export default app;
