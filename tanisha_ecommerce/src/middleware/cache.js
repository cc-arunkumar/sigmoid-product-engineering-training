const cacheStore = new Map();

const cache = (duration) => {
    return (req, res, next) => {
        if(req.method !== "GET"){
            return next();
        }

        const key = req.originalUrl;

        const cachedData = cacheStore.get(key);

        // 1. if cache data exists and is not expired, return cached response
        if(cachedData && (Date.now() - cachedData.timestamp < duration * 1000)){
            return res.json(cachedData.data);
        }

        // 2. if no cache or cache expired, proceed to next middleware and cache the response
        const originalJson = res.json.bind(res);

        res.json = (data) => {
            cacheStore.set(key, {data : data, expiry : Date.now() + duration});
            
            return originalJson(data);
        }

        next();

    }
}

module.exports = cache;