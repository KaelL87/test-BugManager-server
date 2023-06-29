import { Request, Response } from 'express';
import Bug from '../models/BugModel';
import User from '../models/UserModel';
import Project from '../models/ProjectModel';
export const addBugToUser = async (req: Request, res: Response) => {
   const { project: projectId, user: userId, description, creationDate } = req.body;
   try {
      const projectExists = await Project.findOne({ id: projectId });
      if (!projectExists) {
         return res.status(404).json({ message: 'Project was not found' });
      }
      const userExists = await User.findOne({ id: userId });
      if (!userExists) {
         return res.status(404).json({ message: 'User was not found' });
      }
      const bug = new Bug({
         id: (await Bug.find().count()) + 1,
         project: projectExists._id,
         user: userExists._id,
         description,
         creationDate: creationDate ? new Date(creationDate) : Date.now()
      });
      await bug.save();
      return res.status(200).json({ success: true, message: 'Successfully added' });
   } catch (error) {
      console.error('Error while saving the bug:', error);
      return res.status(500).json({ error: 'Error while saving the bug' });
   }
};
export const getBugsSearch = async (req: Request, res: Response) => {
   const { project_id: projectId, user_id: userId, start_date: startDate, end_date: endDate } = req.query;
   try {
      const projectExists = await Project.findOne({ id: projectId });
      const userExists = await User.findOne({ id: userId });
      const pipeline = [];
      console.log(projectId, projectExists);
      if (projectExists) {
         pipeline.push({ $match: { project: projectExists._id } });
      }
      if (userExists) {
         pipeline.push({ $match: { user: userExists._id } });
      }
      if (startDate || endDate) {
         const dateMatch = {} as any;
         if (startDate) {
            dateMatch.$gte = new Date(startDate as string);
         }
         if (endDate) {
            dateMatch.$lte = new Date(endDate as string);
         }
         pipeline.push({ $match: { creationDate: dateMatch } });
      }
      pipeline.push(
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
               username: { $arrayElemAt: [ '$userDetails.name', 0 ] },
               project: { $arrayElemAt: [ '$projectDetails.name', 0 ] },
               creationDate: 1
            }
         }
      );
      const bugs = await Bug.aggregate(pipeline);
      return res.status(200).json(bugs);
   } catch (error) {
      console.error('Error al buscar Bugs:', error);
      return res.status(500).json({ error: 'Error al buscar Bugs' });
   }
};
export const getAllBugs = async (req: Request, res: Response) => {
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
               username: { $arrayElemAt: [ '$userDetails.name', 0 ] },
               project: { $arrayElemAt: [ '$projectDetails.name', 0 ] },
               creationDate: 1
            }
         }
      ];
      const bugs = await Bug.aggregate(pipeline);
      return res.status(200).json({ bugs });
   } catch (error) {
      console.error('Error while filtering:', error);
      return res.status(500).json({ error: 'Error while filtering' });
   }
};
