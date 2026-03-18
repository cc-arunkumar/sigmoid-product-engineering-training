const cacheStore = new Map()

const cache = (duration) => {
    return (req, res, next) => {
        if (req.method !== "GET") {
            return next()
        }

        const key = req.originalUrl;

        const cachedData = cacheStore.get(key);

        if (cachedData && cachedData.expiry > Date.now()) {
            return res.status(200).json(cachedData.data)
        }
        const originalJson = res.json.bind(res)
        res.json = (data) => {
            cacheStore.set(key, {
                data,
                expiry: Date.now() + duration
            })
            return originalJson(data);
        }
        next()
    }
}
module.exports = cache