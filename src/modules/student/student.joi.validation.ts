// import Joi from 'joi';

// const userNameValidationSchema = Joi.object({
//     firstName: Joi.string()
//         .trim()
//         .required()
//         .max(20)
//         .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized format' })
//         .message('{#label} must be in capitalized format'),
//     middleName: Joi.string().required(),
//     lastName: Joi.string()
//         .required()
// });

// const gurdianValiadtionSchema = Joi.object({
//     fatherName: Joi.string().required(),
//     fatherOccupation: Joi.string().required(),
//     fatherContactNo: Joi.string().required(),
//     motherName: Joi.string().required(),
//     motherOccupation: Joi.string().required(),
//     motherContactNo: Joi.string().required(),
// });

// const localGurdianValidationSchema = Joi.object({
//     name: Joi.string().required(),
//     occupation: Joi.string().required(),
//     contactNo: Joi.string().required(),
//     address: Joi.string().required(),
// });

// const studentValidationSchema = Joi.object({
//     id: Joi.string().required(),
//     name: userNameValidationSchema.required(),
//     gender: Joi.string().valid('male', 'female', 'others').required(),
//     dateOfBirth: Joi.string(),
//     email: Joi.string().email().required(),
//     contactNo: Joi.string().required(),
//     emergencyContactNo: Joi.string().required(),
//     bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
//     presentAddress: Joi.string().required(),
//     permanentAddress: Joi.string().required(),
//     gurdian: gurdianValiadtionSchema.required(),
//     localGurdian: localGurdianValidationSchema.required(),
//     profileImg: Joi.string(),
//     isActive: Joi.string().valid('active', 'blocked').default('active'),
// });

// export default studentValidationSchema;