const cacheStore = new Map();

const cache = (duration) => {
  return (req, res, next) => {

    // 1. Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cachedData = cacheStore.get(key);

    // 2. If cache exists and not expired
    if (cachedData && cachedData.expiry > Date.now()) {
      return res.status(200).json(cachedData.data);
    }

    // 3. Capture original res.json
    const originalJson = res.json.bind(res);

    res.json = (data) => {
      // 4. Store in cache
      cacheStore.set(key, {
        data,
        expiry: Date.now() + duration
      });

      // 5. Send response
      return originalJson(data);
    };

    next();
  };
};

module.exports = cache;