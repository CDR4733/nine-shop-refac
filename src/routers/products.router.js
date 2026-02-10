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
  // 3-1. API명세서 틀에 맞게 데이터 수정
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
  const datas = await Product.find().sort({ createdAt: "desc" }).exec();

  // 2. 완료 메시지 반환
  // 2-1. API명세서 틀에 맞게 데이터 수정
  const filteredDatas = datas.map((data) => ({
    id: data.id,
    name: data.name,
    description: data.description,
    manager: data.manager,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }));
  // 2-2. 반환
  return res.status(200).json({
    status: 200,
    message: "상품 목록 조회에 성공했습니다.",
    data: filteredDatas,
  });
});

/** 상품 상세 조회(R-D) **/
productsRouter.get("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  const { id } = req.params;

  // 2. DB에서 조회
  const data = await Product.findById(id).exec();

  // 3. 완료 메시지 반환
  // 3-1. API명세서 틀에 맞게 데이터 수정
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
  return res.status(200).json({
    status: 200,
    message: "상품 상세 조회에 성공했습니다.",
    data: filteredData,
  });
});

/** 상품 수정(U) **/
productsRouter.put("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  const { id } = req.params;

  // 2. 상품 수정 정보 파싱하기
  const { name, description, status, manager, password } = req.body;

  // 3. DB에서 조회 (패스워드 포함)
  const existingProduct = await Product.findById(id, { password: true });

  // 4. 비밀번호 일치 여부 확인
  const isPasswordMatched = password === existingProduct.password;
  if (!isPasswordMatched) {
    return res.status(401).json({
      status: 401,
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  // 5. 입력된 정보 확인 (없는 값은 false처리되어 사라짐)
  const updatedInfo = {
    ...(name && { name }),
    ...(description && { description }),
    ...(status && { status }),
    ...(manager && { manager }),
  };

  // 5. DB에 갱신 (new 옵션을 true로 해야 수정 후 데이터가 표시된다)
  const data = await Product.findByIdAndUpdate(id, updatedInfo, {
    returnDocument: "after",
  });

  // 6. 완료 메시지 반환
  // 6-1. API명세서 틀에 맞게 데이터 수정
  const filteredData = {
    id: data.id,
    name: data.name,
    description: data.description,
    manager: data.manager,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  // 6-2. 반환
  return res.status(200).json({
    status: 200,
    message: "상품 수정에 성공했습니다.",
    data: filteredData,
  });
});

/** 상품 삭제(D) **/
productsRouter.delete("/products/:id", async (req, res) => {
  // 1. 상품 ID 파싱
  const { id } = req.params;

  // 2. 상품 삭제 정보 파싱
  const { password } = req.body;

  // 3. DB에서 조회 (패스워드 포함)
  const existingProduct = await Product.findById(id, { password: true });

  // 4. 비밀번호 일치 여부 확인
  const isPasswordMatched = password === existingProduct.password;
  if (!isPasswordMatched) {
    return res.status(401).json({
      status: 401,
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  // 5. DB에서 삭제
  const data = await Product.findByIdAndDelete(id);

  // 6. 완료 메시지 반환
  // 6-1. API명세서 틀에 맞게 데이터 수정
  const filteredData = {
    id: data.id,
    name: data.name,
    description: data.description,
    manager: data.manager,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  // 6-2. 반환
  return res.status(200).json({
    status: 200,
    message: "상품 삭제에 성공했습니다.",
    data: filteredData,
  });
});

export { productsRouter };
