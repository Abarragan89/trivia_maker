const { Schema, model } = require('mongoose');

const clueSchema = new Schema({
    answer: {
        type: String,
    },
    question: {
        type: String,
    },
    points: {
        type: Number,
    }
})

const gameData = new Schema({
    category: {
        type: String,
    },
    clues: [clueSchema]
})

const GameSchema = new Schema({
    gameTopic: {
        type: String,
        require: true
    },
    gameData: [gameData]
})

const Game = model('game', GameSchema);
module.exports = Game;