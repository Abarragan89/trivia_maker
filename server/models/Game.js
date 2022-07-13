const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    gameTopic: {
        type: String
    },
    categories: [],
    questionAnswers: []
})

const Game = model('game', GameSchema);
module.exports = Game;