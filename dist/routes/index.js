"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BugController_1 = require("../controllers/BugController");
const UserController_1 = require("../controllers/UserController");
const ProjectController_1 = require("../controllers/ProjectController");
const router = express_1.default.Router();
// bugs
router.post('/bug', BugController_1.addBugToUser);
router.get('/bugs', BugController_1.getBugsSearch);
router.get('/allbugs', BugController_1.getAllBugs);
// users
router.get('/users', UserController_1.getAllUsers);
// projects
router.get('/projects', ProjectController_1.getAllProjects);
exports.default = router;
