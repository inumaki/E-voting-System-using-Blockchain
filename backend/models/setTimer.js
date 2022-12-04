const mongoose = require('mongoose')


const setTimer = new mongoose.Schema({
    key:{type:String , required:true,unique:true},
    value:{type:Boolean,default:false}
})

module.exports = mongoose.model('setTimer',setTimer)