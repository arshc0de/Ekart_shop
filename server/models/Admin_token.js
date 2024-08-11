const mongoose = require('mongoose')

const adminTokenSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'ekart_admins'
    },
    token:{
        type:String,
        require:true
    },
    expireAt:{
        type:Date,
        require:true
    }
})

adminTokenSchema.index({expireAt:1},{expireAfterSeconds:0})

module.exports = mongoose.model('ekart_admins_token',adminTokenSchema)