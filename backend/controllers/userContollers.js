const User = require("../models/Users");
const jwt=require("jsonwebtoken")
exports.register = async (req, res) => {
  const { Name, password, email, phone, address } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" ,success:false});
    }

    // Create new user
    const newUser = new User({
      Name,
      password, // Password will be hashed automatically via pre-save hook
      email,
      phone,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser ,success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" ,success:false});
  }
};
const generateToken=(user)=>{
    return  jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1h'})
}
exports.login=async (req,res)=>{
 
    const {email,password}=req.body;
    try{
            const user=await User.findOne({email});
            if(!user){
              return res.status(401).json({msg:"user not found",success:false});
            }
            if(!await user.comparePassword(password)){
                     return res.status(401).json({msg:"invalid password",success:false});
            }
            const tempUser={user_id:user._id,name:user.Name}
            const access_token=generateToken(tempUser);
            res.cookie("accessToken", access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Lax",
              path: "/",
              maxAge: 60 * 60 * 1000, // 15 minutes
            });
            res.status(200).json({access_token,success:true})
            
    }catch(err){
      console.log(err);
      res.json({msg:"server error",success:false})
    }
}
exports.logout=(req,res)=>{
  try{
       res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        path: "/",
        maxAge: 60 * 60 * 1000, // 15 minutes
      })
      res.json({"msg":"logout succssefully",success:true})
  }catch(err){
     console.log(err);
     res.status(201).json({msg:"error logout ",success:false})
  }
}

