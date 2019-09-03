const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const validateTaskInput = require('../validation/valid-task');
router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

router.get("/all" ,(res,req) => {
    Task.find({}, (err, tasks) => {
        let alltasks = {};
        tasks.forEach((task) => {
            alltasks[task._id] = task;
        });
        req.send(alltasks);
    })
});

router.get('/user/:user_id', (req, res) => {
    Task.find({ user: req.params.user_id })
        .then(tasks => res.json(tasks))
        .catch(err =>
            res.status(404).json({ notasksfound: 'No tasks found from that user' }
            )
        );
});

router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err =>
            res.status(404).json({ notaskfound: 'No tasks found with that ID' })
        );

});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTaskInput(req.body);
        debugger;
        if (!isValid) {
            return res.status(400).json(errors);
        }
        if (req.body.pub == 'true') {
            req.body.pub = true;
        } else if (req.body.pub == 'false') {
            req.body.pub = false;
        }
        const newTask = new Task({
            name: req.body.name,
            user: req.user.id,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            description: req.body.description,
            location: req.body.location,
            pub: req.body.pub,

        });

        newTask.save().then(task => res.json(task));
    }
);


module.exports = router;