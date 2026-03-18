const e=require("express");
const users=require("../data/users")

exports.getUsers=(req,res)=>{
    res.json(users);
};

exports.getUserById=(req,res)=>{
    const uId=parseInt(req.params.id);
    const user=users.find(u=>u.id===uId);
    if(!user){
        const error=new Error("User not found");
        error.statusCode=404;
        return next(error);
    }
    res.send(user);
};

exports.createUser=(req,res)=>{
    const {name,email,password}=req.body;
    const newUser={
        id:users.length+1,
        name:name,
        email:email,
        password:password
    };
    users.push(newUser);
    res.status(201).json(newUser);
}

exports.updateUser=(req,res)=>{
    const uId=req.params.id*1;
    const user=users.find(u=>u.id===uId);
    if(!user){
        const error=new Error("User not found");
        error.statusCode=404;
        return next(error);
    }
    const {name,email,password}=req.body;
    user.name=name || user.name;
    user.email=email || user.email;
    user.password=password || user.password;

    res.json(user);
}

exports.deleteUser=(req,res)=>{
    const uId=req.params.id*1;
    const userIndex=users.findIndex(u=>u.id===uId);
    if(userIndex===-1){
        return res.status(404).json({message:"User not found"});
    }
    users.splice(userIndex,1);
    res.json({message:"User deleted successfully"});
}

exports.updatePartialUser=(req,res)=>{
    const uId=req.params.id*1;
    const user=users.find(u=>u.id===uId);
    if(!user){
        const error=new Error("User not found");
        error.statusCode=404;
        return next(error);
    }
    const {name,email,password}=req.body;
    user.name=name || user.name;
    user.email=email || user.email;
    user.password=password || user.password;

    res.json(user);
}