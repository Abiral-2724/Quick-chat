const User = require("../model/userModel");
const cookieParser = require('cookie-parser') ;
const bcrypt = require('bcrypt') ; 
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports.register = async (req , res , next) => {

 try{

    const {username , email , password} = req.body ;
  // check the username if alredy exits
  const usernameCheck = await User.findOne({ username }) ;
  if(usernameCheck){
    return res.json({msg:" Username already exits ' Try Another ! ' " , status : false }) ;
  }

  const emailCheck = await User.findOne( { email }) ;
  if(emailCheck){
    return res.json({msg:" Email already Used ,' Try Another ! ' ", status : false }) ;
  }
  // encryption of the password 
  bcrypt.genSalt(saltRounds , function(err , salt) {
    bcrypt.hash(password , salt , async function(err , hash){
       if(err){
        console.log("Problem while encrypting password") ;
           return res.json({msg:"Problem while encrypting password" , status : false }) ;
       }else{
           let user = await User.create({
               email ,
               password : hash ,
               username ,
           }) ;

            // generating a token 
  let token = jwt.sign({email : email } , "secret")  ;
   // sending the token to the cookie 
res.cookie("token" , token) ;
  console.log(token) ;
          return  res.json({status : true ,user}) ;
       }
    });
  });
   

 }
 catch(e){
    console.log(e.message) ;
   next(e) ;
 }
  
} ; 


module.exports.login = async (req , res , next) => {

    try{
   
       const {email , password} = req.body ;
     // check the username if alredy exits
     const user = await User.findOne({ email }) ;
     if(!user){
       return res.json({msg:" Username or Password Do not match " , status : false }) ;
     }
     bcrypt.compare(password , user.password , function(err , result){
        if(result){
          let token = jwt.sign({email : email } , "secret") ;
          res.cookie("token" , token) ;
          console.log(token) ;
         // res.send("loged in successfully") ;
        return res.json({ status : true ,user }) ;
        }else{
            return res.json({msg:" Username or Password Do not match " , status : false }) ;
        }
      })
    
      
   
    }
    catch(e){
       console.log(e.message) ;
      next(e) ;
    }
     
   } ; 



   module.exports.setAvatar = async (req , res , next) => {
    try{
     const userId = req.params.id ;
     console.log(userId) ;
     const avatarImage = req.body.image ;
     const userData = await User.findByIdAndUpdate({ _id :userId} , {
        isAvatarImageSet : true , 
        avatarImage ,
     })
     return res.json({isSet:userData.isAvatarImageSet , image:userData.avatarImage}) ;
    }
    catch(e){
        console.log(e.message) ;
      next(e) ;
    }
   }
   

   module.exports.logout = async function(req ,res){
    // removing the token [ replacing the token to blank]
    // console.log("token ha = " , token) ;
res.cookie("token" , "") ;
// console.log("token ha = " , token) ;
res.redirect('/register') ;
}
   
module.exports.getAllUsers = async (req,res,next) => {
try{
  const users = await User.find({_id : {$ne : req.params.id}}).select([
    "email" ,
     "username" ,
      "avatarImage" ,
      "_id"
  ]) ;
 return res.json(users) ;
}
catch(ex) {
next(ex) ;
}
}

module.exports.getprofile = async(req,res,next) => {
    try{
        res.send('hello') ;
    }catch(ex){
        next(ex) ;
    }
}