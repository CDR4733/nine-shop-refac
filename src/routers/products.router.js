import express from "express";
import { Product } from "../schemas/product.schema.js";

const productsRouter = express.Router();

/** 상품 생성(C) **/
productsRouter.post("/products", async (req, res) => {
  // 1. 상품 정보 파싱
  const { name, description, manager, password } = req.body;

  // 2. DB에 저장
  const product = new Product({ name, description, manager, password });
  const data = await product.save();

  // 3. 완료 메시지 반환
  // 3-1. 비밀번호 안 보이게 데이터 수정
  const filteredData = {
    id: data.id,
    name: data.name,
    description: data.description,
    manager: data.manager,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  // 3-2. 반환
  return res.status(201).json({
    status: 201,
    message: "상품 생성에 성공했습니다.",
    data: filteredData,
  });
});

/** 상품 목록 조회(R-A) **/
productsRouter.get("/products", async (req, res) => {
  // 1. DB에서 조회 (생성 일시 기준 내림차순 정렬)
  const data = await Product.find().sort({ createdAt: "desc" }).exec();

  // 2. 완료 메시지 반환
  return res.status(200).json({
    status: 200,
    message: "상품 목록 조회에 성공했습니다.",
    data: data,
  });
});

/** 상품 상세 조회(R-D) **/
productsRouter.get("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  const { id } = req.params;

  // 2. DB에서 조회
  const data = await Product.findById(id).exec();

  // 3. 완료 메시지 반환
  return res.status(200).json({
    status: 200,
    message: "상품 상세 조회에 성공했습니다.",
    data: data,
  });
});

/** 상품 수정(U) **/
productsRouter.put("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  // 2. 상품 수정 정보 파싱하기
  // 3. DB에서 조회 (패스워드 포함)
  // 4. 비밀번호 일치 여부 확인
  // 5. DB에 갱신
  // 6. 완료 메시지 반환
});

/** 상품 삭제(D) **/
productsRouter.delete("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  // 2. DB에서 조회 (패스워드 포함)
  // 3. 비밀번호 일치 여부 확인
  // 4. DB에서 삭제
  // 5. 완료 메시지 반환
});

export { productsRouter };
