const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

// Root page
router.get('/', (req, res) => {
    res.render('landing');
})

// ==================
// Auth Routes
// ===================

// show register form
router.get('/register', (req, res) => {
    res.render('register');
})

// Sign Up new user logic using passport
router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/campgrounds');
        })
    });
})

// show login form
router.get('/login', (req,res) => {
    res.render('login');
});
router.post('/login',passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect:'/login'
}), (req, res) => {

})
// logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
})

// middleware

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;