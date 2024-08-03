const mongoose = require('mongoose') ;


const userSchema = mongoose.Schema({
    username : {
        type : String ,
        min : 3 ,
        trim : true ,
        required : true ,
        max : 15 ,
      unique : true ,
    } ,
    email : {
        type : String ,
        required : true ,
        max : 50 ,
      unique : true ,
    }  ,
    password : {
        type : String ,
        min : 6 ,
       
    } ,
    isAvatarImageSet : {
        type : Boolean ,
        default : false ,
    } ,
    avatarImage : {
     type : String ,
     default : "" ,
    } ,
    googleId : {
        type : String ,
      unique : true ,
    } ,
}) ;

module.exports = mongoose.model('Users' , userSchema) ;