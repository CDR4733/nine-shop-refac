import express from "express";
import { SERVER_PORT } from "./constants/env.constant";

const app = express();

app.get("/", (req, res) => {
  return res.json("hello!!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
