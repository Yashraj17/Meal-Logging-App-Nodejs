const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user_Schema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
},
{ timestamps: true }
)

user_Schema.pre('save',async function(next){
     try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next()
     } catch (error) {
        next(error)
     }
})

user_Schema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        throw error
    }
}

const userModel = mongoose.model('User',user_Schema);

module.exports =userModel