const mongoose=require('mongoose');

//schema creation
const adminSchema=mongoose.Schema({
name:String,
email:String,
password:String,
})

//student schema
const employeeschema=mongoose.Schema({
name:String,
email:String,
phone:Number
})
const employeeModel=mongoose.model('employee',employeeschema)
//model creation
const adminModel=mongoose.model('user',adminSchema);
module.exports = {employeeModel,adminModel};
