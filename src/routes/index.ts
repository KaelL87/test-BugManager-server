import express from 'express'
import { addBugToUser, getAllBugs, getBugsSearch } from '../controllers/BugController'
import { getAllUsers } from '../controllers/UserController'
import { getAllProjects } from '../controllers/ProjectController'

const router = express.Router()

// bugs
router.post('/bug', addBugToUser)
router.get('/bugs', getBugsSearch)
router.get('/allbugs', getAllBugs)

// users
router.get('/users', getAllUsers)

// projects
router.get('/projects', getAllProjects)

export default router
