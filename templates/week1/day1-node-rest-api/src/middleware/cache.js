const cacheStore = new Map();

const cache = (duration) => {
    return (req,res,next) => {
        //only cache GET requests
        if(req.method !== "GET"){
            return next();
        }

        const key = req.originalUrl;

        const cachedData = cacheStore.get(key);

        //1. If cache exists are not expired
        if(cachedData && cachedData.expiry > Date.now()){
            return res.status(200).json(cachedData.data);
        }

        //2. Capturing Response before sending
        const originalJson = res.json.bind(res);

        res.json = (data) => {
            cacheStore.set(key,{
                data,
                expiry: Date.now() + duration
            });

            return originalJson(data);
        };

        next();
    };
};

module.exports=cache;