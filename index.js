const express = require('express') ;
const cors = require('cors') ;
const mongoose = require('mongoose') ;
const userRoutes = require('./routes/userRoutes') ;
const messageRoute = require('./routes/messageRoute') ;
const socket = require('socket.io') ;
const app = express() ;
const Users = require("./model/userModel") ;
const session = require("express-session") ;
const passport = require("passport") ;



require('dotenv').config() ;

app.use(cors()) ;
app.use(express.json());
app.use("/api/auth" , userRoutes) ;
app.use("/api/messages" , messageRoute) ;



// set up passport
app.use(passport.initialize()) ;
app.use(passport.session()) ;



mongoose.connect(process.env.MONGO_URL)
.then(function(){
    console.log('Database connected successfully ! ') ;
    })
    .catch(function(err){
     console.log("Error occured while connecting server : ") ;
     console.log(err) ;
    }) ;

   

app.get("/login/success" , async(req ,res) => {
    console.log('req = ' , req.user) ;
})

const server = app.listen(process.env.PORT , () => {
    console.log(`server started on port ${process.env.PORT}`) ;
})

const io = socket(server , {
    cors : {
        origin :" http://localhost:3000" ,
        credential : true ,
    }
})

global.onlineUsers = new Map() ;

io.on("connection" , (socket) => {
    global.chatSocket = socket ;
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId ,socket.id) ;
    }) ;

    socket.on('send-msg' , (data)=> {

        const sendUserSocket = onlineUsers.get(data.to); 
        if(sendUserSocket){
            console.log("message" ,data.message) ;
            socket.to(sendUserSocket).emit("msg-recieve" , data.message) ;
        }
    })
})


