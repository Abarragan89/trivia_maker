const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    gameTopic: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    categories: [],
    questionAnswers: []
})

const Game = model('game', GameSchema);
module.exports = Game;