var express = require('express');
const Wordle = require('../models/wordles');
var router = express.Router();

/* GET users listing. */
router.get('/random/:length', async function(req, res) {
    const wordLength = +req.params.length;
    if (wordLength) {
        // Counting words truely
        const wordsCount = await Wordle.countDocuments({ find: true, length: wordLength });
        // If not equals 0
        if (wordsCount) {
            // Select one word randomly
            const random = Math.floor( Math.random() * wordsCount );
            const word = await Wordle.findOne({ find: true, length: wordLength }).skip(random);
            res.json({result: true, word});
        }
        else res.status(404).json({result: false});
    }
    else res.status(404).json({result: false});
});

/* GET users listing. */
router.get('/check/:word', async function(req, res) {
    const word = req.params.word.toLowerCase();
    if (word) {
        // Search word
        const wordSearch = await Wordle.findOne({ word });
        // If find
        if (wordSearch) {
            res.json({result: true, word});
        }
        else res.json({result: false});
    }
    else res.status(404).json({result: false});
});

module.exports = router;
