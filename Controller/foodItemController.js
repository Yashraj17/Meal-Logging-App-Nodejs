const foodModel = require("../Model/foodItemModel")
const hashtagsModel = require("../Model/hashtagsModel")
const mealModel = require("../Model/mealModel")
const CustomError = require("../utils/CustomError")

/// add fooditems
exports.addFoodItems = async(req,res,next)=>{
    const {foodName,ingredients,calorie} = req.body
    try {
        if(!foodName || !ingredients || !calorie){
            next(new CustomError("All Fields is Required", 400))
        }else{
            let food = await foodModel.create(req.body)
            res.status(200).json({
                success:true,
                message:'Data inserted Successfully',
                food
            })
        }
    } catch (error) {
         next(new CustomError(error.message, 400))
    }
}
 
/// get all food items
exports.getFoodItems = async(req,res,next)=>{
    try {
        const foodItems = await foodModel.find({})
        if (foodItems) {
            res.status(200).json({
                success:true,
                message:'FoodItems List ',
                foodItems
            })
        }
        else{
            next(new CustomError("No FoodItems Found ", 404))
        }
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}
// add new hashtags
exports.addHasTags = async (req,res,next)=>{
    const {tagName} = req.body
    try {
        if(!tagName){
            next(new CustomError("All Fields is Required", 400))
        }else{
            let hashtag = await hashtagsModel.create(req.body)
            res.status(200).json({
                success:true,
                message:'Data inserted Successfully',
                hashtag
            })
        }
    } catch (error) {
         next(new CustomError(error.message, 400))
    }
}

/// get all hashtags
exports.getAllTags = async(req,res,next)=>{
    try {
        let hashtags = await hashtagsModel.find({})
        if (hashtags) {
            res.status(200).json({
                success:true,
                message:'FoodItems List ',
                hashtags
            })
        }
        else{
            next(new CustomError("No FoodItems Found ", 404))
        }
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}

/// add user new meal log
exports.addMeallog = async(req,res,next)=>{
    const userId = req.user?._id
    try {
        const {foodItems,hashTags} = req.body
        console.log(foodItems,hashTags);
        if (!userId || !foodItems || !hashTags ) {
            next(new CustomError("All Fields is Required", 400))
        } else {
            const tagArray =[]
            for (let i = 0; i < hashTags.length; i++) {

                ///checking if tag exist or not
               let tag = await hashtagsModel.findOne({tagName:hashTags[i]})
               console.log("hello tag",tag);
                if(tag){
                    tagArray.push(tag._id)
                }
                else{
                    /// creating new hashtags by the user
                    tag = await hashtagsModel.create({tagName:hashTags[i]})
                    tagArray.push(tag._id)
                }
            }
            req.body.userId = userId
            req.body.hashTags = tagArray
            const meal = await mealModel.create(req.body)
            if(meal){
                res.status(200).json({
                    success:true,
                    message:'New Meal Added '
                })
            }
        }
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}

/// get user meal
exports.getUserMeal = async(req,res,next)=>{
    const userId = req.user._id
    try {
        let userMeal = await mealModel.find(userId).populate('foodItems').populate('hashTags','tagName').populate('userId','name email')
        if (userMeal) {
            res.status(200).json({
                success:true,
                message:'Get All users Meal',
                userMeal
            })
        }
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}
// k89qJgnwCP1vlsRx