const mogoose= require("mongoose");
const reviewSchema= mogoose.Schema({
    userId:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"Plants",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
}, {timestamps:true});
module.exports=mogoose.model("Review",reviewSchema);
