const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      Campground = require('./models/campgrounds'),
      Comment = require('./models/comment'),
      seedDB = require('./seeds'),
      mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: 
true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
seedDB();

app.get('/', (req, res) => {
    res.render('landing');
})

// INDEX - route Show all campgrounds
app.get('/campgrounds', (req, res) => {
    // res.render('campgrounds', {campgrounds})
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log('Oopsie! Something went wrong', err);
        } else {
            // console.log('Items retrieved\n', campgrounds);
            res.render('campgrounds/index', {campgrounds})
        }
    })
})
// NEW - show a form to add new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
// Shows more about the camground with id
app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) 
            console.log(err);
        else {
            res.render('campgrounds/show', {campground: foundCampground});
        }
    })
})

app.post('/campgrounds', (req, res) => {
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

// ===================
// COMMENTS ROUTES
// ===================

app.get('/campgrounds/:id/comments/new', (req, res) => {
    // Find campground and send it as a param
    Campground.findById(req.params.id, (err, campground) => {
        if(err)
            console.log(err);
        else
        res.render('comments/new', {campground});        
    })
})
app.post('/campgrounds/:id/comments', (req, res) => {
    // Lookup campgrounds using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) 
                    console.log(err);
                else
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
            })
            
        }
    })
})
app.listen(3000, () => {
    console.log('Yelpcamp server has started.\nListening on port 3000...');  
})