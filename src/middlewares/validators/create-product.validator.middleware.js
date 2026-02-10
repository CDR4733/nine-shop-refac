import Joi from "joi";

export const createProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.base": "상품명은 문자열이어야 합니다.",
        "any.required": "상품명을 입력해 주세요.",
      }),
      description: Joi.string().required().messages({
        "string.base": "상품 설명은 문자열이어야 합니다.",
        "any.required": "상품 설명을 입력해 주세요.",
      }),
      manager: Joi.string().required().messages({
        "string.base": "담당자는 문자열이어야 합니다.",
        "any.required": "담당자를 입력해 주세요.",
      }),
      password: Joi.string().required().messages({
        "string.base": "비밀번호는 문자열이어야 합니다.",
        "any.required": "비밀번호를 입력해 주세요.",
      }),
    });
    await joiSchema.validateAsync(req.body);

    next();
  } catch (err) {
    next(err);
  }
};
