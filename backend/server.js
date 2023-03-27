// Import required modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from 'dotenv';

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV}` });

// Create an Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

const uri = process.env.MONGODB_URI;
const main = async () => {
  console.log(`Connecting to DB @ ${uri}`);
  await mongoose.connect(uri);
  console.log(`Connected to DB @ ${uri}`);
}

main().catch(err => console.log(err))
// Import routes
import usersRouter from "./routes/users.route.js";
import peepsRouter from "./routes/peeps.route.js";

// Use routes
app.use("/users", usersRouter);
app.use("/peeps", peepsRouter);

// Set the server to listen on a specific port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;