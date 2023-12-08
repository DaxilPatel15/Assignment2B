const mongoose = require('mongoose');

// Create schema definition object using mapping notation
const projectsSchemaDefinition = {
    // add each element and its properties
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: 'TO DO'
    }
};

// Create new mongoose schema using the definition object
var projectsSchema = new mongoose.Schema(projectsSchemaDefinition);
// Create new mongoose model using the schema object and
// Import new model > provide name and schema
module.exports = mongoose.model('Login', projectsSchema);