const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    availability:{type:Boolean, required:true},
    image:{type:String, required:true}
})

const OrderModel=mongoose.model("order",orderSchema);

module.exports={OrderModel}