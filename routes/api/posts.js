const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc Tests posts route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));


//@route GET  api/posts
//@desc Get post
//@access Public
router.get('/', (req, res) => {
    Post.find().sort({date: -1}).then(posts => res.json(posts)).catch(err => res.status(404));
});

//@route DELETE api/posts/:id
//@desc Delete post
//@access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { 
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized '})

            }
            //Delete
            post.remove().then(() => res.json({ success: true}));
        })
        .catch(err => res.status(404).json({ postnotfound: 'post not found'}));
    });
});



//@route POST api/posts/like/:id
//@desc add Like to array 
//@access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {   
    Profile.findOne({ user: req.user.id })
    .then(profile => { 
        Post.findById(req.params.id)
        .then(post => {
           //Check user id is in the likes array 
           if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ alreadyliked: 'post has already been liked'})
           }
             // Add user id to likes array
             post.likes.unshift({ user: req.user.id });
             post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'post not found'})) 
    }
  )
})



//@route POST api/posts/unlike/:id
//@desc Unlike the post
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {   
    Profile.findOne({ user: req.user.id })
    .then(profile => { 
        Post.findById(req.params.id)
        .then(post => {
           //Check user id is in the likes array 
           if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ alreadyliked: 'You have not liked the post'})
           }
             // Remove index
            const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

            //Splice out of array
            post.likes.splice(removeIndex, 1); 
            post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({ postnotfound: 'post not found'})) 
    }
  )
})



//@route GET api/posts/:id
//@desc Get post
//@access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.status(404).json({nopostfound: 'No post found with ID provided'}));
});




//@route POST api/posts
//@desc Create new post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false} ), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if(!isValid){ 
        return res.status(400).json(errors);
    }
 
    const newPost = new Post({
        text: req.body.text,
        // text: req.user.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});





//@route POST api/posts/comment/:id
//@desc Add comment to post
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if(!isValid){ 
        return res.status(400).json(errors);
    }
 
    Post.findById(req.params.id)
    .then(post => {
        
        const newComment = {
            text: req.body.text,
            name: req.body.name, 
            avatar: req.body.avatar,
            user: req.user.id

        }

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({nopostfound: 'no post found'})); 
});



//@route DELETE api/posts/comment/:id/:comment_id
//@desc Add comment to post
//@access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        
       //Check if comment exists
       if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
           return res.status(404).json({commentnotexist: 'comment does not exist'})
       }
 
        const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id)

        post.comments.splice(removeIndex, 1)

        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({nopostfound: 'no post found'})); 
});



module.exports = router; 