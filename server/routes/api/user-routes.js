const router = require('express').Router();
const { addUser, login } = require('../../controllers/user');

router.route('/').post( addUser);
router.route('/login/').post(login);

module.exports = router;