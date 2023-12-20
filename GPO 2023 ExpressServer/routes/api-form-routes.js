const express = require('express');
const {
    getInfo,
    setRecenze,
    getformDate, 
} = require('../controllers/api-form-controller');

const router = express.Router();

router.post('/InfoForm', getInfo);
router.post('/setRecenze', setRecenze);
router.post('/getformDate', getformDate);

module.exports = router;