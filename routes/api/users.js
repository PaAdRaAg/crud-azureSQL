const router = require('express').Router();
const { User } = require('../../db');
const { check, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post('/register', [
    check('name', 'Username is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.create(req.body);
    res.json(user);
});

router.put('/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.userId }
    });
    res.json({ success: 'UPDATED successfully' });
});

router.delete('/:userId', async (req, res) => {
    await User.destroy({
        where: { id: req.params.userId }
    });
    res.json({ success: 'DELETED successfully' });
});

module.exports = router;