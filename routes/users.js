const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');


router.post('/signup', (req, res) => {
    //Post request for new users
    
    //validations for registering new users
    const {errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email })
    .then (user => {
        if (user) {
            errors.email = "A user with this e-mail has already been registered";
            return res.status(400).json(errors)
        } else {
            const newUser = new User ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer' + token
                                });
                            });

                    });
                })
            })
        }
    })
});


router.post('/login', (req,res) => {
    //Post request to log in users
    const password = req.body.password;
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(404).json({email: "This email is not registered"});
        }

        bcrypt.compare(password, user.password).then (isMatch => {
            if (isMatch) {
                const payload = {id: user.id, name: user.name};

                jwt.sign(payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err,token) => {
                    res.json({
                        success: true,
                        token: 'Bearer' + token
                    });
                });

            } else {
                return res.status(400).json({password: "Incorrect Password"});
            }
        })
    })
})

router.get('/all', (req,res) => {
    //Post request to retrieve all users
    User.find({}, (err, users) => {
        let allUsers = {};
        users.forEach((user) => {
            allUsers[user._id] = user;
        });
        res.send(allUsers);
    })
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    debugger;
    res.json({ 
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
     });
})




module.exports = router;