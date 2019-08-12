const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      Campground = require('./models/campgrounds'),
      Comment = require('./models/comment'),
      seedDB = require('./seeds'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user'),
      mongoose = require('mongoose'),
      commentRoutes = require('./routes/comments'),
      campgroundRoutes = require('./routes/campgrounds'),
      indexRoutes = require('./routes/index'),
      methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/camp_vas', { useNewUrlParser: 
true });

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
// seedDB(); //Seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Akash is the coolest!',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Requiring routes
app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

// setting up localhost port
app.listen(3000, () => {
    console.log('campvas server is started.\nListening on port 3000...');  
})