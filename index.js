const express=require('express');
const cors=require('cors');
const route=require('./route/authenticate.route')
const cookieParser=require('cookie-parser');
require('dotenv').config({path:'./configuration/.env'});
const app=express();

//database connection
require('./database/db')

//middleware setup
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cors({
origin:'https://online-class-login-crud-frontend.vercel.app',
credentials:true,
methods:["GET","POST","PUT","DELETE"],

}));
//app_cookies_initial
app.use(cookieParser());
app.use(route);


//server is running
app.listen(process.env.PORT,()=>{
console.log("server is running",process.env.PORT)
;})