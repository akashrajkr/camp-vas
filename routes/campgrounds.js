// INDEX - route Show all campgrounds
const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const middleware = require('../middleware');

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
router.get('/new',middleware.isLoggedIn, (req, res) => {
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

router.post('/',middleware.isLoggedIn, (req, res) => {
    //get data from form and add to the campgrounds array
    //redirect back to campgrounds page
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.desc;
    const author = {
        id :req.user._id,
        username: req.user.username
    }
    const newCampground = {name, image, description, author, price};
    Campground.create(newCampground)
        .then(item => {
            console.log(item.name, 'Added successfully.');
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect('/campgrounds')
})

// Edit campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, campground) => {
            res.render('campgrounds/edit', {campground});
     })
});
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // Find and update a correct campground

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
    // redirect somewhere
});
// Destroy campground route
router.delete('/:id', middleware.checkCampgroundOwnership, (req,res) => {
    Campground.findByIdAndRemove(req.params.id, (err, campground) => {
        if(err) {
            req.flash('error', err.message)
        } else {
            req.flash('success', 'Successfully deleted!')
            res.redirect('/campgrounds')
        }
    })
})


module.exports = router;