import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../app/utils/catchAsync';

const getStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'students retrieved successfully',
    data: result
  })

})
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'student retrieved successfully',
    data: result
  })

})
const deleteeStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'students deleted successfully',
    data: result
  })
})
export const StudentControllers = {
  getStudents,
  getSingleStudent,
  deleteeStudent
};
