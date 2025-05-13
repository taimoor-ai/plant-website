const { register,login,logout } = require("../controllers/userContollers");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const userValidation = [
  body("Name").notEmpty().withMessage("Name most be provided"),
  body("password").notEmpty().withMessage("password most be provided"),
  body("email").isEmail().notEmpty().withMessage("email most be provided"),
  body("phone").notEmpty().withMessage("phone most be provided"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const loginValidation=[
    body("email").notEmpty().isEmail().withMessage("email most provided"),
    body("password").notEmpty().withMessage("password most provided "),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    }
]
router.post("/register",userValidation, register);
router.get("/login",loginValidation,login)
router.post("/logout",logout)
module.exports = router;
