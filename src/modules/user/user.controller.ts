/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../app/utils/catchAsync';
const createStudent = catchAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Student created successfully',
        data: result
    })

});
export const UserControllers = {
    createStudent
}