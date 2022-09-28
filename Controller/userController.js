const { userSchema, loginSchema } = require('../Middleware/validation_schema')
const UserModel = require("../Model/userModel")
const jwt = require('jsonwebtoken');
const CustomError = require("../utils/CustomError");

const register = async (req,res,next) =>{

    try {
        const result = await userSchema.validateAsync(req.body)
        if (result) {
            const checkUser = await UserModel.findOne({email:result.email})
            if (checkUser !== null ) {
                return next(new CustomError('Email already registered', 404));
            }
            else{
                const user = await UserModel.create(result)
                const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                return res.status(200).json({
                    success:true,
                    user,
                    token
                })
            }
        }
       
    } catch (error) {
        if(error.isJoi){
           return next(new CustomError(error.message, 422));
        }
        return next(new CustomError(error.message, 400));
    }
}

const login = async (req,res,next) =>{
    try {
        const result = await loginSchema.validateAsync(req.body)
        if(result){
            const user = await UserModel.findOne({email:result.email});
            if (user) {
                const isMatch = await user.isValidPassword(result.password)

                if (user.email === result.email && isMatch) {
                    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                    return res.status(200).json({_id:user._id,name:user.name,email:user.email,token:token,image:user.photo})
                }
                else{
                    return next(new CustomError('Email or Password does not match', 404));
                }

            } else {
                return next(new CustomError('User not exist', 404));
            }
        }
    } catch (error) {
        if(error.isJoi){
            console.log(error.message);
           return next(new CustomError(error.message, 422));
        }
        return next(new CustomError(error.message, 400));
    }
}


module.exports ={
    register,
    login,
}