const express = require('express');
const {
    autorize,
    newstatmen,
    getRecenze, 
    getstatmens,
} = require('../controllers/api-main-controller');

const router = express.Router();

router.post('/autorization', autorize);
router.post('/NewStatmen', newstatmen);
router.post('/getRecenze', getRecenze);
router.post('/getstatmens', getstatmens);

module.exports = router;