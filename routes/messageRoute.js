const { addMessage, getAllMessage , deleteMessage } = require("../controllers/messagesController");
const { route } = require("./userRoutes");

const router = require("express").Router() ;

router.post('/addmsg' , addMessage) ;
router.post('/getmsg' , getAllMessage) ;
// Route to delete a message by ID
module.exports = router ;