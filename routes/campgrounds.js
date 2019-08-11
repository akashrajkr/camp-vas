// INDEX - route Show all campgrounds
const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');

router.get('/', (req, res) => {
    
    // res.render('campgrounds', {campgrounds})
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log('Oopsie! Something went wrong', err);
        } else {
            // console.log('Items retrieved\n', campgrounds);
            res.render('campgrounds/index', {campgrounds});
        }
    })
})
// NEW - show a form to add new campground
router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})
// Shows more about the camground with id
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) 
            console.log(err);
        else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    })
})

router.post('/',isLoggedIn, (req, res) => {
    //get data from form and add to the campgrounds array
    //redirect back to campgrounds page
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.desc;
    const newCampground = {name, image, description};
    Campground.create(newCampground)
        .then(item => {
            console.log(item.name, 'Added successfully.');
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect('/campgrounds')
})
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;