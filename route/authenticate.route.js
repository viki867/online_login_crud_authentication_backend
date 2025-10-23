const express=require('express');
const { signup, login, verifytoken, dashboard, getuser, getuserbyid, adduser, updateuser, deleteuser } = require('../controllers/authenticate.controller');
const route=express.Router();


//signup route
route.post('/signup',signup)

//login route
route.post('/login',login)

//getuser
route.get('/getuser',getuser);

//getuserbyid
route.get('/getuser/:id',getuserbyid);

//adduser
route.post('/adduser',adduser);

//updateuser
route.put('/updateuser/:id',updateuser);

//deleteuser
route.delete('/deleteuser/:id',deleteuser);

//dashboard
route.get('/dashboard',verifytoken,dashboard) //(req,res)=>{} ,verifiy token is a middleware

module.exports=route;