const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); 

//Load Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');



//@route GET api/profile/test
//@desc Tests profile route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));


//@route GET api/profile
//@desc get current users profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
    .populate('user',['name', 'avatar'])
        .then(profile => {
            if(!profile){ 
                errors.noprofile = "Profile doesn't exist for the current user"
                return res.status(400).json(errors)
            }
            res.json(profile); 
        })
        .catch(err => res.status(404).json(err))
});

//@route GET api/profile/all
//@desc Get all profiles
//@access public
router.get('/all', (req,res) => {
    Profile.find() 
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = "No profiles were found"
            return res.status(400).json(errors)
        }

        res.json(profiles)
    })
    .catch(err => res.status(404).json(err))
})




//@route GET api/profile/handle/:handle (back end api)
//@desc Get profile by handle
//@access Profile

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar']) 
    .then(profile  => {
        if(!profile){
            errors.noprofile = "There is no profile under this user"
            res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))
});



//@route GET api/profile/user/:user_id (back end api)
//@desc Get profile by user_id
//@access Profile

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user_id: req.params._user_id })
    .populate('user', ['name', 'avatar']) 
    .then(profile => {
        if(!profile){
            errors.noprofile = "There is no profile under this user"
            res.status(400).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))
});



//@route GET api/profile
//@desc Create/Update user profile
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validProfileInput(req.body)

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
        profileFields.user = req.user.id; 
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.status) profileFields.status = req.body.status;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        //Skills - Split into array
        if(typeof req.body.skills !== 'undefined'){
            profileFields.skills = req.body.skills.split(',');
        };
        //Social 
        profileFields.social = {};

        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        
        Profile.findOne({ user: req.user.id })
            .then(profile => { 
                if(profile){
                //Update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true}
                )
                .then(profile => res.json(profile));
            } else {
                //Create

                //Check if profile handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if(profile) {
                        errors.handle = 'Handle aready exists';
                        res.status(400).json(errors);
                    }
                    //Save Profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
             }
        })
  }
);


//@route POST api/profile/experience
//@desc Add/Edit experience 
//@access private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title, 
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        //Add to Experience Array
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});


//@route DELETE api/profile/experience 
//@desc Delete 
//@access private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school, 
            degree: req.body.degree,
            major: req.body.major,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        //Add to Education Array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});





//@route DELETE api/profile/experience/:exp_id
//@desc Delete experience from profile
//@access private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
    //Get Remove Index
    const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params._exp_id);

    //Splice out of array
    profile.experience.splice(removeIndex, 1);

    //save
    profile.save().then(profile => res.json(profile))
})
.catch(err => res.status(400).json(err))
})

//@route DELETE api/profile/education/:edu_id
//@desc Delete education from profile
//@access private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
    //Get Remove Index
    const removeIndex = profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);
 
    //Splice out of array
    profile.education.splice(removeIndex, 1);

    //save
    profile.save().then(profile => res.json(profile))
})
.catch(err => res.status(400).json(err))
});


//@route DELETE api/profile
//@desc Delete user and profile
//@access private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
  .then((() => {
      User.findOneAndRemove({ _id: req.user.id })
      .then(() => res.json({ success: true}))
  }))
  .catch(err => res.status(400).json(err))
}); 

module.exports = router; 