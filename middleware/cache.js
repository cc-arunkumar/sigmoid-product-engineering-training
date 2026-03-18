
const cacheStore = new Map();

const cache = (duration)=>{

  return (req , res , next) =>{
    // only  cache GET requsest
    if(req.method !== 'GET'){
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedData = cacheStore.get(key);

    // if cache exists and not expired

    if(cachedData && cachedData.expiry > Date.now()){
      return res.status(200).json(cachedData.data);

      
    }

    // capturing Response Beforte sending
  const originalJson = res.json.bind(res);

  res.json = (data)=>{
    cacheStore.set(key,{
      data,
      expiry: Date.now() + duration
    })

    return originalJson(data);

  };
  next();

  }
}
module.exports = cache;