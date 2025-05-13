const mongoose= require("mongoose");
const accessoriesSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    commonName:[{type:String}],
    description: {
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        required: true,
        enum: ["small", "medium", "large"]
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: [{
        type: String,
        required: true,
    },],
    category: {
        type: String,
        required: true,
    },
    isavailable: {
        type: Boolean,
        default: true,
    },
}, {timestamps:true});
module.exports=mongoose.model("accessories",accessoriesSchema)