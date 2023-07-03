const mongoose = require('mongoose');

const wordleSchema = mongoose.Schema({
	word: String,
	length: Number,
	find: Boolean,
	date: Date,
	views: Number,
});

const Wordle = mongoose.model('wordles', wordleSchema);

module.exports = Wordle;