// cache.js
const cacheStore = new Map();

const cache = (duration) => {
  return (req, res, next) => {
    
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cachedData = cacheStore.get(key);

    // 1. Return cached data if exists and not expired
    if (cachedData && cachedData.expiry > Date.now()) {
      console.log("Cache HIT");
      return res.status(200).json(cachedData.data);
    }

    console.log("Cache MISS");

    // 2. Capture response before sending
    const originalJson = res.json.bind(res);

    res.json = (data) => {
      cacheStore.set(key, {
        data,
        expiry: Date.now() + duration
      });

      return originalJson(data);
    };

    next();
  };
};

module.exports = cache;