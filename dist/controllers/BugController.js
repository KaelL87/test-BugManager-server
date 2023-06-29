"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBugs = exports.getBugsSearch = exports.addBugToUser = void 0;
const BugModel_1 = __importDefault(require("../models/BugModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const addBugToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project: projectId, user: userId, description, creationDate } = req.body;
    try {
        const projectExists = yield ProjectModel_1.default.findOne({ id: projectId });
        if (!projectExists) {
            return res.status(404).json({ message: 'Project was not found' });
        }
        const userExists = yield UserModel_1.default.findOne({ id: userId });
        if (!userExists) {
            return res.status(404).json({ message: 'User was not found' });
        }
        const bug = new BugModel_1.default({
            id: (yield BugModel_1.default.find().count()) + 1,
            project: projectExists._id,
            user: userExists._id,
            description,
            creationDate: creationDate ? new Date(creationDate) : Date.now()
        });
        yield bug.save();
        return res.status(200).json({ success: true, message: 'Successfully added' });
    }
    catch (error) {
        console.error('Error while saving the bug:', error);
        return res.status(500).json({ error: 'Error while saving the bug' });
    }
});
exports.addBugToUser = addBugToUser;
const getBugsSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id: projectId, user_id: userId, start_date: startDate, end_date: endDate } = req.query;
    try {
        const projectExists = yield ProjectModel_1.default.findOne({ id: projectId });
        const userExists = yield UserModel_1.default.findOne({ id: userId });
        const pipeline = [];
        console.log(projectId, projectExists);
        if (projectExists) {
            pipeline.push({ $match: { project: projectExists._id } });
        }
        if (userExists) {
            pipeline.push({ $match: { user: userExists._id } });
        }
        if (startDate || endDate) {
            const dateMatch = {};
            if (startDate) {
                dateMatch.$gte = new Date(startDate);
            }
            if (endDate) {
                dateMatch.$lte = new Date(endDate);
            }
            pipeline.push({ $match: { creationDate: dateMatch } });
        }
        pipeline.push({
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            }
        }, {
            $lookup: {
                from: 'projects',
                localField: 'project',
                foreignField: '_id',
                as: 'projectDetails'
            }
        }, {
            $project: {
                id: '$_id',
                description: 1,
                username: { $arrayElemAt: ['$userDetails.name', 0] },
                project: { $arrayElemAt: ['$projectDetails.name', 0] },
                creationDate: 1
            }
        });
        const bugs = yield BugModel_1.default.aggregate(pipeline);
        return res.status(200).json(bugs);
    }
    catch (error) {
        console.error('Error al buscar Bugs:', error);
        return res.status(500).json({ error: 'Error al buscar Bugs' });
    }
});
exports.getBugsSearch = getBugsSearch;
const getAllBugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project',
                    foreignField: '_id',
                    as: 'projectDetails'
                }
            },
            {
                $project: {
                    id: '$_id',
                    description: 1,
                    username: { $arrayElemAt: ['$userDetails.name', 0] },
                    project: { $arrayElemAt: ['$projectDetails.name', 0] },
                    creationDate: 1
                }
            }
        ];
        const bugs = yield BugModel_1.default.aggregate(pipeline);
        return res.status(200).json({ bugs });
    }
    catch (error) {
        console.error('Error while filtering:', error);
        return res.status(500).json({ error: 'Error while filtering' });
    }
});
exports.getAllBugs = getAllBugs;
