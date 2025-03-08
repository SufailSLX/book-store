// IMPORT 
const Router  = require("express")
const session = require('express-session');

const userRoute = Router()

// USERNAME AND PASS 
const user = {
    username:"abc",
    password:"123"
}

userRoute.get("/login",(req,res)=>{
    // res.send("Login Page")
    if(req.session.user){
        res.redirect("/")
    }else{
        res.render("login")
    }
})

//USER-LOGIN

userRoute.post("/login",(req,res)=>{
            // res.send("Hello")
    if(req.body.username === user.username && req.body.password === user.password){
        req.session.user = req.body.username
        
        res.redirect("/")
    }else{
        req.flash("msg", "invalid! Username or Password");
        res.redirect("/login")
    }
})

userRoute.get("/", (req,res)=>{
    if(req.session.user){
        console.log("Home Page Rendering...!");
        
        res.render('home')
    }else{
        res.redirect("/login")
    }
})

//USER-lOGOUT

// userRoute.get("/logout",(req,res)=>{
//     // res.redirect("/login")
//     // res.session.destroy()

//       req.session.destroy()
//       req.flash("msg", "Logged Out")
//       res.redirect("/login")
// })

userRoute.get("/logout", (req, res) => {
    console.log("LogOut");
    
    req.flash('msg', 'Logged out');
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.redirect("/login"); 
    });
});



module.exports = userRoute   