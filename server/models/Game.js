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

const gameData = new Schema(
    {
        category: {
            type: String,
        },
        clues: [clueSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const GameSchema = new Schema(
    {
        gameTopic: {
            type: String,
            require: true
        },
        gameData: [gameData],
        
        public: {
            type: Boolean,
            default: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
    }
)

// Get all the actual questions and make sure to get rid of NA form elements(those are the undefined)
GameSchema.virtual('questionCount').get(function () {
    let count = 0;
    for (let i = 0; i < this.gameData.length; i++) {
        for (let j = 0; j < this.gameData[i].clues.length; j ++) {
            if(this.gameData[i].clues[j].points !== undefined) {
                count += 1
            }
        }
    }
    return count;

})



const Game = model('game', GameSchema);

module.exports = Game;