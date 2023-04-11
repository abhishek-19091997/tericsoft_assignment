const express = require("express");
const { connection } = require("./configs/db");
const { userModel } = require("./Model/userModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const { authentication } = require("./middleware/authentication");
const { BMIModel } = require("./Model/bmiModel");


const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});
//signup part
app.post('/signup', async(req, res) => {

    const { email, name, password } = req.body;
    const isUser = await userModel.findOne({ email: email });
    if (isUser) {
        res.send({ msg:"User alredy exist go to login"})
    }
    else {
        bcrypt.hash(password, 4, async function (err, hash) {
          if (err) {
            res.send({ msg: "Somthing went wrong in bcrypt" });
          }
          const new_user = new userModel({
            email,
            name,
            password: hash,
          });
          try {
              await new_user.save();
              res.send({msg:"signup successful"})
          } catch (err) {
            res.send({ msg: "Somthing went wrong in bcrypt", error: err });
            }
            //  console.log(new_user); 
        });

       
    }
   
})

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email });
    const user_id=User._id
    console.log(user_id);
    bcrypt.compare(password, User.password, function (err, result) {
        if (err) {
            res.send({msg:"Somthing went wrong try again later"})
        }
        if (result) {
            var token = jwt.sign({ user_id }, process.env.SECRET_KEY);
            res.send({mas:"login Successful",token})
        }
        else {
            res.send({ mas: "login Faild"});
        }
   })

})
//profile
app.get("/getprofile", authentication, async (req, res) => {
    const { user_id }=req.body;
    const user = await userModel.findOne({ _id: user_id });
    const { name, email } = user;
    res.send({name,email})
})
//calculate Bmi

app.post('/calculateBMI', authentication, async (req, res) => {
    const { height, weight, user_id } = req.body;
    const height_in_meter = Number(height) * 0.3048;
    const BMI = Number(weight) / height_in_meter ** 2;
    const new_bmi = new BMIModel({
        BMI,
        height: height_in_meter,
        weight,
        user_id,
    })
    await new_bmi.save();
    res.send({BMI})
})
app.listen(8001, async() => {
    try {
        await connection;
    } catch (err) {
        console.log(err);
    }
  console.log("listening on 8001");
});
 
