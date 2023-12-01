import express from "express";
import { UserControllers } from './user.controller';
const router = express.Router();
import validateRequest from '../../app/middlewares/validateRequest';
import { createStudentValidationSchema } from "../student/student.validation";

router.post('/create-student', validateRequest(createStudentValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;
