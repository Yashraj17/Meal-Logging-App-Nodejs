const mongoose = require('mongoose')

const foodItem_Schema = mongoose.Schema({
    foodName:{type:String,require:true},
    ingredients:[
        {
            name:{type:String},
            amount:{type:String},
            unit:{type:String}
        }
    ],
    calorie:{type:String,require:true},
},
{ timestamps: true }
)
const foodModel = mongoose.model('Food',foodItem_Schema);
module.exports =foodModel