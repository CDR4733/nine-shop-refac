import mongoose from "mongoose";
import { PRODUCT_STATUS } from "../constants/product.constant";

const productSchema = new mongoose.Schema(
  // 1. 스키마 정의
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // 비밀번호이므로 데이터 조회할 때 배제시킴
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_STATUS), // PRODUCT_STATUS의 value 값으로 만든 배열
      default: PRODUCT_STATUS.FOR_SALE,
    },
  },
  // 2. 추가 옵션
  {
    timestamps: true, // createdAt, updatedAt을 사용하기 위해 true
    toJSON: { virtuals: true }, // _id 대신 id 가상
  },
);

export const Product = mongoose.model("Product", productSchema);
