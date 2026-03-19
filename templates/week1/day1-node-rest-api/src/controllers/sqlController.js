import sqlUser from "../models/sqlUserModel.js";

const createSqlUser = async(req,res)=>{
    const user = await sqlUser.create(req.body);
    res.status(201).json(user);
};

export default createSqlUser;