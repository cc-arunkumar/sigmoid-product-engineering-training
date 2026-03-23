const logger = (req, res, nxt) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`${method}:${url} - ${time}`);

    nxt();
}

module.exports = logger;