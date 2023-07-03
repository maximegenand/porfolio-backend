const mangoose = require('mangoose');

const projectSchema = mongoose.Schema({
	name: String,
	description: Number,
	date: Date,
	image: String,
	views: Number,
});

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;