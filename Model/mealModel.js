const mongoose = require('mongoose')

const meal_Schema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    foodItems:  
       [ {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Food",
    }],
    hashTags:  
       [ {
        type : mongoose.Schema.Types.ObjectId,
        ref: "HasTag",
    }],
},
{ timestamps: true }
)
const mealModel = mongoose.model('Meal',meal_Schema)
module.exports =mealModel