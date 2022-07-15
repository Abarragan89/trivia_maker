const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    gameTopic: {
        type: String,
        require: true
    },
    questions: [],
    answers: [],
    categories: []
})

const Game = model('game', GameSchema);
module.exports = Game;