const cacheStore = new Map();

const cache = (duration) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cachedData = cacheStore.get(key);

    // 1. Serve from cache if it exists and is not expired
    if (cachedData && cachedData.expiry > Date.now()) {
      return res.status(200).json(cachedData.data);
    }

    // 2. Intercept response
    const originalJson = res.json.bind(res);
    
    res.json = (data) => {
      // Only cache successful responses (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(key, {
          data,
          expiry: Date.now() + duration
        });

        // Prevent memory leaks by actively removing expired keys
        setTimeout(() => {
          cacheStore.delete(key);
        }, duration);
      }
      
      return originalJson(data);
    };

    next();
  };
};

module.exports = cache;