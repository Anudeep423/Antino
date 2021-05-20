var express = require("express");
var router = express.Router();
const { signup ,signin,getAllUsers} = require("../controllers/users");
const {getUserById,getAUser,isAdmin}  = require("../controllers/users")

// middleware

router.param("userID",getUserById );



//auth route for signup

router.post("/signup",signup);

//auth route for signin

router.post( "/signin", signin  );

// route to get all users

router.get("/getAllUsers" , getAllUsers)

// route to check if a user is admin 

router.get("/isadmin/:userID" ,isAdmin , (req,res) => { res.json("You are an admin") } )

// route to get user Details by hid ID

router.get("/userdetails/:userID",getAUser)


module.exports = router;


