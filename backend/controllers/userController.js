const ErrorHandler=require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user= await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profileUrl"
        }
    });
    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    // })
    //or 
    sendToken(user,201,res);
});

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    //check if user has given password and email both

    if(!email || !password)return next(new ErrorHandler("Please Enter Email and Password",401));

    const user=await User.findOne({email}).select("+password");//as we do password false so to fetch password details

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched=user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    sendToken(user,200,res);
});

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success:true,
        message: "Logged Out",
    });
});

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));

    }

    //Get ResetPassword Token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});
    // req.protocal is http or https
    //req.get("host") is local host
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/${resetToken}`

    const message= `Your password reset token is:- \n\n${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    }catch(err){
        this.resetPasswordToken=undefined;
        this.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(err.message,500));
    }
});
