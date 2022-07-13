const router = require('express').Router();
const {
    getAllGames,
    deleteGame,
    createGame
} = require('../../controllers/game-controller')

// Set up GET all POST at /api/pizzas
router.route('/').get(getAllGames)
router.route('/create/:userId/').post(createGame);

router.route('/delete/:gameId').delete(deleteGame)

module.exports = router;
