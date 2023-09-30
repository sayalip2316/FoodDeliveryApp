const mongoose=require("mongoose");

const foodSchema=mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    availability:{type:Boolean, required:true},
    image:{type:String, required:true}
})

const FoodModel=mongoose.model("item",foodSchema);

module.exports={FoodModel}