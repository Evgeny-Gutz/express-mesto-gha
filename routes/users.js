const router = require('express').Router();
const {getUsers, createUser, findUser} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findUser)
router.post('/', createUser);

module.exports = router;