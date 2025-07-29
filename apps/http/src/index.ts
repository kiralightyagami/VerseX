import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes/v1";
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json())

app.use("/api/v1", router)

app.listen(process.env.PORT || 3000)