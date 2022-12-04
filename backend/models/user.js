const mongoose = require('mongoose')
const passportlocalmongoose= require('passport-local-mongoose')

const user = new mongoose.Schema({
    adhaar:{type:String , required:true,unique:true},
    key:{type:String,required:true,unique:true}
})

module.exports = mongoose.model('User',user)