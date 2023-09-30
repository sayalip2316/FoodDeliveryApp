const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

userRouter.post("/register", async (req, res) => {
    const { userName, email, password} = req.body

    try {
        isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.send({ "msg": "Login Directly" })
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ userName, email, password: hash})
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })
        });
    } catch (error) {
        res.status(401).send({ "msg": "Some error occourd while  Registration" })

    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let accesstoken = jwt.sign({ "userID": user._id }, 'accesstoken', { expiresIn: "7d" });


                    res.status(201).send({ "msg": "login success", "token": accesstoken, "user":user })

                } else {
                    res.status(401).send({ "msg": "wrong input,login failed ,User already exist, please login" })
                }
            });
        } else {
            res.status(401).send({ "msg": "login failed,user is not present" })

        }
    } catch (error) {
        res.status(401).send({ "msg": "error occourd while login " })

    }
})

userRouter.post("/logout", async (req, res) => {
    // On the client side, remove the token from local storage
    localStorage.removeItem('token'); // Replace 'yourAuthTokenKeyName' with your actual local storage key name
    res.status(200).send({ "msg": "Logout successful" });
});
module.exports={userRouter}