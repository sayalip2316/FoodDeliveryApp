const express=require("express");
const FoodRouter=express.Router();
const {FoodModel}=require("../model/food.model");
const {OrderModel}=require("../model/order.model");
const {auth}=require("../middleware/auth.middleware")

FoodRouter.post("/add",async(req,res)=>{
      try {
        const item=new FoodModel(req.body)
        await item.save();
        res.status(200).send({msg:"Item added successfully"})
      } catch (error) {
        res.status(400).send({msg:error.message})
      }
})

FoodRouter.get("/",async(req,res)=>{
    try {
        const data=await FoodModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

FoodRouter.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;
  try {
    await FoodModel.findByIdAndDelete(id)
    res.status(200).send({msg:"item deleted"})
  } catch (error) {
    res.status(400).send({msg:error.message})
  }
})

FoodRouter.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    // Create a regex pattern from the provided name (case-insensitive)
    const nameRegex = new RegExp(name, "i");

    // Search for food items whose name matches the regex pattern
    const data = await FoodModel.find({ name: nameRegex });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

FoodRouter.get("/:id",async(req,res)=>{
  const {id}=req.params
  try {
    const item=await FoodModel.findOne({_id:id});
    res.status(200).send(item)
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
})

FoodRouter.post("/order/add", auth,async(req,res)=>{
  try {
    const order=new OrderModel(req.body)
    await order.save();
    res.status(200).send({msg:"Order placed successfully"})
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
})

FoodRouter.get("/order/get",async(req,res)=>{
  try {
    const data=await OrderModel.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
})
module.exports={FoodRouter}