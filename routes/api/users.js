const gravitar = require('gravatar'); //profile avatar
const express = require('express'); 
const brcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User'); 

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const router = express.Router();



//@route GET api/users/test
//@desc Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Users Works'}));

//@route GET api/users/register
//@desc Tests Register route
//@access Public
router.post('/register', (req, res) => { 
    const { errors, isValid } = validateRegisterInput(req.body); 

    //Check Validation 
    if(!isValid) {
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            errors.email = 'Email already exists'
        return res.status(400).json(errors);   //If email already exists
    } else {
        const avatar = gravitar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
         });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,    //same as avatar: avatar
            password: req.body.password
        });
        
        // Hash password 
        brcrypt.genSalt(10, (err, salt) => {
            brcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err)throw err; 

                    newUser.password = hash; 
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(error => console.log(error));

            })
        })
    }
  })
});

//@route GET api/users/login
//@desc Logs in the user (returns JWT Token)
//@access Public
router.post('/login', (req, res) => {
 const { errors, isValid }  = validateLoginInput(req.body);

 //Check Validation
 if(!isValid) {
     return res.status(400).json(errors)
 }

    const email = req.body.email;
    const password = req.body.password; 

    //Find user by email
    User.findOne({email})
        .then(user => { 
            //Validate user exists 
            if(!user) {
                errors.email = "User Not Found";
                return res.status(400).json({errors});
            } 

            //Confirm Password is Correct with bcrypt
            brcrypt
                .compare(password, user.password)//comparing user input to stored password in db 
                .then(isMatch => {
                    if(isMatch) { //ifMatch then generate a token

                        //createe jwt payload 
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                        //Sign Token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 1800}, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        })
                    } else {
                        errors.password = "Password is Incorrect";
                        return res.status(400).json({errors});
                    }
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error));
}); 

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id, 
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = router; 