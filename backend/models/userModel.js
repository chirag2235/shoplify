const mongoose=require('mongoose');
const validator=require("validator");
const bcryptjs=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter a valid Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false //if we do user.find() then it not select
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{   
            type:String,
            required:true 
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});
userSchema.pre("save",async function(next){//before save salt

    if(!this.isModified("password")){
        next();
    }

    this.password=await bcrypt.hash(this.password,10);
})

//JWT TOKEN 

module.exports=mongoose.model('User', userSchema);