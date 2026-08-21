import express from "express";
import cors from "cors"
import jokes from "./models/jokes.js";
import jokeRoutes from './routes/jokes.routes.js'
import env from './config/env.js'
import { logger } from "./middleware/logger.js";

const app = express();

app.use(logger)
app.use(cors())
app.use(express.json())


app.use("/jokes", jokeRoutes);


const PORT = process.env.port

app.listen(PORT, () => {
  console.log(`The web app is running on http://localhost:${PORT}`);
})  