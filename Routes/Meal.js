const express = require('express');
const { addFoodItems, addHasTags, getFoodItems, getAllTags, addMeallog, getUserMeal } = require('../Controller/foodItemController');
const authUser = require('../Middleware/authUser')
const router = express.Router();

/// ****** fooditems*******//

/// add fooditems
router.post('/addfooditem',authUser,addFoodItems)
/// get all fooditems
router.get('/getfooditem',authUser,getFoodItems)


/// ******hashtags****//

// get all hashtags
router.get('/getallhashtag',getAllTags)
/// add new hashtags
router.post('/addhashtag',addHasTags)



/// *****add meal log*****//

/// add user new meal log
router.post('/addmeallog',authUser,addMeallog)

/// get all user's meal log
router.get('/getusermeal',authUser,getUserMeal)


module.exports = router