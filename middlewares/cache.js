const cacheStore=new Map();

const cache=(duration)=>{
    return (req, res, next) => {
        if(req.method !== "GET"){
            return next();
        }
        const key = req.originalUrl;
        if (cacheStore.has(key)) {
            const cachedData = cacheStore.get(key);
            // if cache data exists and not expired, return cached response
            if (cachedData && cachedData.expiry > Date.now()) {
                console.log("Serving from cache:", key);
                return res.status(200).json(cachedData.data);
            }
        }
        const originalJson = res.json.blind(res);
        res.sendResponse = res.json;
        res.json = (data) => {
            cacheStore.set(key, { data: data, expiry: Date.now() + duration});
            console.log("Caching response for:", key);
            return originalJson(data);
        };
        next();
    }
}  
export default cache;