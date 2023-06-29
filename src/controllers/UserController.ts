import { Request, Response } from 'express';
import User from '../models/UserModel';

export const getAllUsers = async ({}, res: Response) => {
   try {
      const users = await User.find({});
      if (users.length === 0) {
        return res.status(404).json({ message: 'No se encontraron errores para los filtros proporcionados' });
      }
  
      res.status(200).json(users);
    } catch (err) {
      console.error('Error al obtener los errores desde la base de datos:', err);
      res.status(500).json({ message: 'Error al obtener los errores desde la base de datos' });
    }
};
