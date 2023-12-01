import { z } from "zod";
const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).refine((value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
    }, { message: "First name is not in capitalized format" }),
    middleName: z.string().min(1),
    lastName: z.string().min(1).refine((value) => z.string().regex(/^[A-Za-z]+$/).parse(value), { message: "Last name is not valid" }),
});


const gurdianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

const localGurdianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female', 'others']),
            dateOfBirth: z.string().optional(),
            email: z.string().min(1).email({ message: "Email is not a valid email type" }),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: z.string().min(1),
            permanentAddress: z.string().min(1),
            gurdian: gurdianValidationSchema,
            localGurdian: localGurdianValidationSchema,
            admissionSemester: z.string(),
            profileImg: z.string().min(1)
        })
    })
});

export const studentValidations = {
    createStudentValidationSchema
};