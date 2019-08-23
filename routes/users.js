const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');



router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
    .then (user => {
        if (user) {
            return res.status(400).json({email: "A user has already registered with this email address"})
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
                            keys.secret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Beary' + token
                                });
                            });

                    });
                })
            })
        }
    })
});


router.post('/login', (req,res) => {
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
                    keys.secret,
                    {expiresIn: 3600},
                    (err,token) => {
                    res.json({
                        success: true,
                        token: 'Beary' + token
                    });
                });

            } else {
                return res.status(400).json({password: "Incorrect Password"});
            }
        })
    })
})

router.get('/all', (req,res) => {
    User.find({}, (err, users) => {
        let allUsers = {};
        users.forEach((user) => {
            allUser[user._id] = user;
        });
        res.send(allUsers);
    })
});



router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;