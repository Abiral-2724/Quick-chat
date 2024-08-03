const { register, login ,setAvatar ,logout, getAllUsers, getprofile } = require("../controllers/userController");

const router = require("express").Router() ;

router.post("/register" , register) ;
router.post("/login" , login) ;
router.post("/setAvatar/:id" , setAvatar) ;
router.get("/logout" , logout) ;
router.get("/allusers/:id" ,getAllUsers)
router.get("/profile" ,getprofile) ;
module.exports = router ;