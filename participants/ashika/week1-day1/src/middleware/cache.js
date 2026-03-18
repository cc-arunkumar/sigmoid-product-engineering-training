const cacheStore=new Map();

const cache=(duration)=>{
    return (req, res, next)=>{
        if(req.method !=="GET"){
              return next();
        }

        const key=req.originalUrl;
        const cachedata=cacheStore.get(key);

        if(cachedata && cachedata.expiry> Date.now()){
            return res.status(202).json(cachedata.data);
        }

        const originaljson=res.json.bind(res);

        res.json=(data)=>{
            cacheStore.set(key , {
                data,
                expiry: Date.now()+duration
            });
            return originaljson(data);
        };
        next();
    };
};

module.exports=cache;