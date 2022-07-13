const { Game } = require('../models')

const gameController = { 
    // getAllGames
    getAllGames(req, res) {
        Game.find({})
            .then(dbGameData => res.json(dbGameData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create a game
    createGame({ body }, res) {
        Game.create(body)
            .then(dbGameData => res.json(dbGameData))
            .catch(err => res.status(400).json(err))
    },
    // delete a game
    deleteGame({ params }, res) {
        Game.findOneAndDelete({ _id: params.gameId})
            .then(dbGameData => {
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'No Game found with that ID!'})
                    return;
                }
                res.json(dbGameData)
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = gameController;