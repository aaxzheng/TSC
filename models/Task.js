const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    pub: {
        type: Boolean,
        required: true
    }
})

module.exports = Task = mongoose.model('tasks', TaskSchema);