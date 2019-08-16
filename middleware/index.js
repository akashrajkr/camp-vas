const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');

const middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                req.flash('error', 'Campground not found');
                res.redirect('back')
            } else {
                // the "campground" returned by mongoose is not in string format but a mongoose object so we cant just compare like (campground.author.id === req.user._id) because req.user._id is a string
                // So we use the function provided by mongoose
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to that!')
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                req.flash('error', 'Comment not found!')
                res.redirect('back')
            } else {
                // the "campground" returned by mongoose is not in string format but a mongoose object so we cant just compare like (campground.author.id === req.user._id) because req.user._id is a string
                // So we use the function provided by mongoose
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have any permission to do that!')
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
}

module.exports = middlewareObj;