const cacheStore = new Map()

const cache = (duration) => {

    return (req, res, next) => {
        
        // Only cache get requests
        if(req.method !== "GET"){
            return next();
        }

        const key = equal.originalUrl;

        const cachedData = cacheStore.get(key);

        // If cache exists not expired
        if(cachedData && cachedData.expiry > Date.now()){
            return res.status(200).json(cachedData.data);
        }

        // Capturing response before sending 
        const originalJson = res.json.bind(res);

        res.json = (data) => {
            cacheStore.set(key, {
                data,
                expiry: Date.now() + duration
            });

            return originalJson(data)
        };
        next();
    };
};

module.exports = cache;