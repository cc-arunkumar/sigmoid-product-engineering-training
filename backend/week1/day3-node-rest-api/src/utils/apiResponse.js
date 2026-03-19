exports.successResponse = (res, message, data) => {
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
};

exports.errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
