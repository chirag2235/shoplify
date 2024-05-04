const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures=require("../utils/apifeatures");
const catchAsyncErrors=require("../middleware/catchAsyncError");

exports.createProduct= catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage=5;
    const productCount=await Product.countDocuments();
    const api= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await api.query;
    res.status(201).json({
        success:true,
        products,
        productCount
    })
})

exports.updateProduct=catchAsyncErrors(async (req,res,next)=>{
    let product =await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        //same as this
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
})

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        product
    })
})