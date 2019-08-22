const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                })
            })
        }
    })
});

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