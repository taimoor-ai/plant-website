const express=require('express');
const app=express();
const {connectDB}=require('./db.js');
const cors=require('cors');
app.use(cors({
    origin: '*'
}));
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());
connectDB()
app.use("/user",require("./routes/userRoutes.js"))
app.use("/cart",require("./routes/cart.js"));
app.use("/product",require("./routes/plants.js"))
app.use("/accessory",require("./routes/accessories.js"));
app.use("/order",require("./routes/orders.js"));
app.use("/review",require("./routes/reviews.js"));
app.listen(3000,()=>{
   
    console.log('Server is running on port 3000');
});