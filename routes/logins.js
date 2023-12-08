// Import necessary modules and the Login model
const express = require('express');
const router = express.Router();
const Login = require('../models/login'); // Update the path accordingly


router.get("/", (req, res, next)=>{
    res.render("viewss/viewadd", {title: "login"})
})

router.get("/viewadd", (req, res, next)=>{
    res.render("viewss/view", {title: "add new login"})
})



// Handle form submission
router.post('/view', (req, res, next) => {
    Login.create(
        {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    },(err, newLogin) => {
        if(err){
            console.log(err);

        }
        else{
            res.redirect('/view');
        }
    })
});

module.exports = router;
