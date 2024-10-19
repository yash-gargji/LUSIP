const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },   
  description: {
    type: String,
    required: true,
  },
  facultyName:{
    type:String,
    required:true,
  },
  prerequisites:{
    type:String,
    required:true,
  },
  mode:{
    type:String,
    required:true,
  },
  preferredBranch:{
    type:String,
    required:true,
  }
});

const Project = mongoose.model('PROJECT', projectSchema);

module.exports = Project;
