var express = require('express');
var router = express.Router();
const passport = require('passport');
var User = require("../models/user")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Virtual Art' });
});
//get login
router.get("/login", (req,res,next) => {
  let messages = req.session.message || [];
  req.session.messages;
  res.render("login",{ title: "Login", messages: messages});
});

//post login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/logins',
  failureRedirect: '/login',
  failureMessage: 'Invalid credentials'
}));


//get register
router.get("/register",(req,res,next)=>{
  res.render("register",{ title: "Register"})
});
//post register
router.post("/register", (req, res, next)=>{
  User.register(
    new User({ username: req.body.username}),
    req.body.password,
    (err, newUser)=>{
      req.login(newUser, (err)=>{
        res.redirect("/logins");});
    });
});

router.get("/about",(req,res,next)=>{
  res.render("about",{ title: "About Me"})
});

router.get("/contact",(req,res,next)=>{
  res.render("contact",{ title: "Contact Me"})
});

router.get("/art",(req,res,next)=>{
  res.render("art",{ title: "Art"})
});

router.get("/edit",(req,res,next)=>{
  res.render("edit",{ title: "Edit"})
});





router.get("/rare",(req,res,next)=>{
  res.render("rare",{ title: "Rare"})
});

router.get("/viewadd",(req,res,next)=>{
  res.render("viewss/viewadd",{ title: "viewadd"})
});
router.post("/viewadd",(req,res,next)=>{
  res.render("viewss/view ",{ title: "viewadd"})
});

router.get("/view",(req,res,next)=>{
  res.render("viewss/view",{ title: "view"})
});





module.exports = router;
