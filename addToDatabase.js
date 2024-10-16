const mongoose = require('mongoose');
const express=require("express");
const app=express();
app.use(express.json());

mongoose.connect("mongodb+srv://admin:ZpaEp1woepiFGQcF@cluster0.pr6f0.mongodb.net/user_app?retryWrites=true&w=majority")

const User=mongoose.model('Users',{name:String,email:String,password:String});
app.post("/signup",async function(req,res){

const userName=req.body.name;
const email=req.body.email;
const password=req.body.password;

  const existingUser=await User.findOne({email:email});
  if(existingUser){
    return res.status(404).json({
      'msg':'user already exists'
    })
  }
  const user=new User({
    name:userName,
    email:email,
    password:password
  })

  user.save()
 res.json({
   "msg":"user crested successfully"
 })
  
})

app.listen(3000)