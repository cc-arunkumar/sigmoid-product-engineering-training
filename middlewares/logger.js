const logger = (req, res, next) => {
    const method = req.method;
    const url = req.Url;
    const time = new Date().toISOString();

    console.log(`${method} ${url} - ${time}`);
    next();

};

module.exports = logger;
