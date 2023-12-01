/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from "http-status";
import catchAsync from '../../app/utils/catchAsync';
import { academicSemesterServices as AcademicSemesterServices } from './academicSemester.service';
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
        await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
    });
});

const createAcademicSemester = catchAsync(async (req, res, next) => {

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Academic semester is created successfully',
        data: result
    })

});
const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
        semesterId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester is updated succesfully',
        data: result,
    });
});

export const AcademicSemesterControllers = {
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    createAcademicSemester,
    updateAcademicSemester
}