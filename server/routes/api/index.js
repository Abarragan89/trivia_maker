const router = require('express').Router();
const gameRoutes = require('./game-routes');

// add prefix of /game to routes
router.use('/game', gameRoutes);

module.exports = router;