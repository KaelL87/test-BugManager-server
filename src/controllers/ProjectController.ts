import { Response } from 'express';
import Project from '../models/ProjectModel'

export const getAllProjects = async ({}, res: Response) => {
  try {
    const projects = await Project.find({});
    if (projects.length === 0) {
      return res.status(404).json({ message: 'No se encontraron errores para los filtros proporcionados' });
    }

    res.status(200).json(projects);
  } catch (err) {
    console.error('Error al obtener los errores desde la base de datos:', err);
    res.status(500).json({ message: 'Error al obtener los errores desde la base de datos' });
  }
}
