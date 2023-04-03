const mongoose=require('mongoose')

mongoose.connect(process.env.MONGOCONNECTION_STRING,{
    useNewUrlParser: true
} )
.then(()=>console.log('connected to mongodb'))
.catch((error)=>console.log(error))

module.exports=mongoose