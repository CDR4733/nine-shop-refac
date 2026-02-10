export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Joi에게 err 잡힌 경우
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      message: err.message, // Joi에서 지정한 메시지로 에러메시지 출력
    });
  }

  return res.status(500).json({
    status: 500,
    message: "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.",
  });
};
