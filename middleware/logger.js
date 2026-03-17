const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();

  console.log(`Method of the req is : ${method}
                Url of the request is : ${url}
                Time on which the req is sent : ${time}`);

  next();
};

module.exports = logger;
