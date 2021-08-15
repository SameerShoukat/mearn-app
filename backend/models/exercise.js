const mongoose = require('mongoose')

const Schema = mongoose.Schema

const excerciseSchema = new Schema({
    username : {type : String , require : true},
    description : {type : String , require : true},
    duration : {type : Number , require : true},
    date : {type : Date , require : true}
    },
    {
        timestamp : true
    });

    const Exercise = mongoose.model('Exercise', excerciseSchema)

    module.exports = Exercise;