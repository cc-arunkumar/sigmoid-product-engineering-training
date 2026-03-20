const successResponse = (res, message, data, statuscode = 200) => {
  return res.status(statuscode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message = "Internal Server Error", statuscode = 500) => {
  return res.status(statuscode).json({
    success: false,
    message
  });
};

module.exports = {
  successResponse,
  errorResponse
};