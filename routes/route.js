const express = require('express');
const { 
    login, 
    signup, 
    profile, 
    index, 
    sessionLogin, 
    sessionLogout 
} = require('../controllers/firebase');
const router = express.Router();


// get request for login page
router.get("/login", login);
  
// get request for sign up page
router.get("/signup", signup)
  

// get request for profile page
router.get("/profile", profile)

// get request for index.html
router.get("/", index)
  
// post request for session login
router.post("/sessionLogin", sessionLogin)

//get request for session logout
router.get("/sessionLogout", sessionLogout);


module.exports = router;