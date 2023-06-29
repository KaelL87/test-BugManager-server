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
exports.getAllProjects = void 0;
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const getAllProjects = ({}, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield ProjectModel_1.default.find({});
        if (projects.length === 0) {
            return res.status(404).json({ message: 'No se encontraron errores para los filtros proporcionados' });
        }
        res.status(200).json(projects);
    }
    catch (err) {
        console.error('Error al obtener los errores desde la base de datos:', err);
        res.status(500).json({ message: 'Error al obtener los errores desde la base de datos' });
    }
});
exports.getAllProjects = getAllProjects;
