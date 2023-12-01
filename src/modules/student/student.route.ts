import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();
router.get('/', StudentControllers.getStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteeStudent);
export const StudentRoutes = router;
