"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BugSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: 100,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Bug', BugSchema);
