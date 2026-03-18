const e=require("express");
const orders=require("../data/orders")

exports.getOrders=(req,res)=>{
    res.json(orders);
};

exports.getOrderById=(req,res)=>{
    const oId=parseInt(req.params.id);
    const order=orders.find(o=>o.id===oId);
    if(!order){
        const error=new Error("Order not found");
        error.statusCode=404;
        return next(error);
    }
    res.send(order);
};

exports.createOrder=(req,res)=>{
    const {userId,productIds,totalAmount}=req.body;
    const newOrder={
        id:orders.length+1,
        userId:userId,
        productIds:productIds,
        totalAmount:totalAmount
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
}

exports.updateOrder=(req,res)=>{
    const oId=req.params.id*1;
    const order=orders.find(o=>o.id===oId);
    if(!order){
        const error=new Error("Order not found");
        error.statusCode=404;
        return next(error);
    }
    const {userId,productIds,totalAmount}=req.body;
    order.userId=userId || order.userId;
    order.productIds=productIds || order.productIds;
    order.totalAmount=totalAmount || order.totalAmount;

    res.json(order);
}

exports.deleteOrder=(req,res)=>{
    const oId=req.params.id*1;
    const orderIndex=orders.findIndex(o=>o.id===oId);
    if(orderIndex===-1){
        return res.status(404).json({message:"Order not found"});
    }
    orders.splice(orderIndex,1);
    res.json({message:"Order deleted successfully"});
}

exports.updatePartialOrder=(req,res)=>{
    const oId=req.params.id*1;
    const order=orders.find(o=>o.id===oId);
    if(!order){
        const error=new Error("Order not found");
        error.statusCode=404;
        return next(error);
    }
    const {userId,productIds,totalAmount}=req.body;
    order.userId=userId || order.userId;
    order.productIds=productIds || order.productIds;
    order.totalAmount=totalAmount || order.totalAmount;

    res.json(order);
}