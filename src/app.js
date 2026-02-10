import express from "express";
import { SERVER_PORT } from "./constants/env.constant.js";
import { productsRouter } from "./routers/products.router.js";
import { connect } from "./schemas/index.js";

// MongoDB에 연결
connect();

// express 사용
const app = express();

// body에 담긴 JSON데이터를 해석하여 req.body객체로 만들어줌
app.use(express.json());

// qs 라이브러리를 사용하여 중첩된 객체나 배열을 파싱할 수 있게 해줌
app.use(express.urlencoded({ extended: true }));

// Router로 넘겨준다.
app.use("/", productsRouter);

// 서버가 어느 포트로 열렸는지 알려줌
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
