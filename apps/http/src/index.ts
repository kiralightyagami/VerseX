import express from "express";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", );

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

