const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from the server');
});
router.use('/api', require('./api'));

module.exports = router;