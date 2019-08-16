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
            req.flash('error', err.message);
            return res.redirect('register');
        }
       else 
        {
             passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Welcome to Camp-vas, '+user.username);
                res.redirect('/campgrounds');
            })
        }
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
    req.flash('success', 'Welcome back!');
})
// logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'logged you out');
    res.redirect('/campgrounds');
})

module.exports = router;