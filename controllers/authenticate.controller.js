const {adminModel,employeeModel}=require('../models/autenticate.model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async(req,res)=>{
    const {name,email,password}=req.body;
        // check if user already exists
        
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
    
      return res.json({ error: "Email already registered" });
    }
    let hashpassword=await bcrypt.hash(password,10);
    console.log(hashpassword)

         let user=await adminModel.create({name,email,password:hashpassword})
        res.json({message:"register succcessfully"});

    
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await adminModel.findOne({ email: email });
    
  
  
    if (user) 
    {
       await bcrypt.compare(password,user.password,(err,response)=>{
      if(err)
      {
       return res.json({ success: false, message: "password incorrect" });
      }
      if(response)
      {
              let token=jwt.sign({email:user.email},"vcx")
              //setting up cookie in your browser 
              res.cookie("token",token)
              return res.json({ success: true, message: "sucess" });
      }
    })
    }
    else {
      return res.json({ success: false, message: "user not found" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const verifytoken=(req,res,next)=>{

let token=req.cookies.token;
console.log(token);
if(token){
jwt.verify(token,"vcx",(err,decoded)=>{
if(err){
return res.json({message:"unauthorized auther"})
}
else{
req.email=decoded.email
}
next()
})
}

}
const dashboard=(req,res)=>{
return res.json({message:"success",email:req.email})
}

//-------------------------------------------------------
//getuser
const getuser=async(req,res)=>{
let user=await employeeModel.find();
return res.json(user)
}

//getuserbyid
const getuserbyid=async(req,res)=>{
let id=req.params.id;
let user=await employeeModel.find({_id:id})
return res.json(user)
}

//adduser
const adduser=async(req,res)=>{
let {name,email,phone}=req.body;
let user=await employeeModel.create({name,email,phone});
console.log(user);
return res.json({message:"user added successfully"});
}

//updateuser
const updateuser=async(req,res)=>{
let id=req.params.id;
let {name,email,phone}=req.body;
let user=await employeeModel.updateOne({_id:id},{$set:{name,email,phone}})
return res.json({message:"updated successfully"});
}

//deleteuser
const deleteuser=async(req,res)=>{
let id=req.params.id; 
let user=await employeeModel.deleteOne({_id:id});
return res.json({message:"deleted succesfully",user})
}

module.exports={signup,login,dashboard,verifytoken,adduser,getuser,getuserbyid,updateuser,deleteuser}
 