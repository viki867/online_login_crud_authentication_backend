const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_DB,{
useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log("connected"))
.catch(()=>console.log("eroor"))