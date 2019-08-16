const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// Comments new
router.get('/new',middleware.isLoggedIn,  (req, res) => {
    // Find campground and send it as a param
    Campground.findById(req.params.id, (err, campground) => {
        if(err)
            console.log(err);
        else
        res.render('comments/new', {campground});
    })
})

// Comments add
router.post('/',middleware.isLoggedIn, (req, res) => {
    // Lookup campgrounds using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            req.flash('error', 'Something went wrong!')
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) 
                    req.flash('error', 'Something went wrong!')
                else{
                    // Add username and id to each comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Comment added successfully')
                    res.redirect('/campgrounds/' + req.params.id);
                }
            })
        }
    })
})

router.get('/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            req.flash('error', 'Could\'nt find Campground')
            console.log(err);
        }
        else{
            Comment.findById(req.params.comment_id, (err, comment) => {
                if(err){ 
                    req.flash('error', 'Could not find comment!')
                    console.log(err);
                }
                else{
                    res.render('comments/edit', {campground, comment})
                }
            })
        }
    })
})

// Comment edit route
router.put('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    // req.body.comment.text is where the new comment lies
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if(err) {
            req.flash('error', 'Something went wrong!')
            console.log(err)
        } else {
            req.flash('success', 'Comment updated!')
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

router.delete('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            req.flash('error', 'Something went wrong!')
            console.log(err);
            res.redirect('back');
        }
        else {
            req.flash('success', 'Comment deleted successfully!')
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

module.exports = router;