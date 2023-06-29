"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});
exports.default = (0, mongoose_1.model)('Project', ProjectSchema);
/* const Project = model('Project', ProjectSchema);
const projects = [
   { projectId: 1, name: 'Project 1', description: 'description 1' },
   { projectId: 2, name: 'Project 2', description: 'description 2' },
   { projectId: 3, name: 'Project 3', description: 'description 3' },
   { projectId: 4, name: 'Project 4', description: 'description 4' },
   { projectId: 5, name: 'Project 5', description: 'description 5' }
];
Project.deleteMany({});
Project.insertMany(projects)
   .then(() => {
      console.log('projects guardados exitosamente en la base de datos');
   })
   .catch(error => {
      console.error('Error al guardar projects en la base de datos: ', error);
   }); */
