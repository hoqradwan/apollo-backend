import { Schema, model } from 'mongoose';
import { TGurdian, TLocalGurdian, TStudent, StudentModel, TUserName } from './student.interface';
import validator from "validator";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "first name cannot be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: "{VALUE} is not in capitalized format"
    }
  },
  middleName: {
    type: String,
    required: [true, "Middle name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => {
        validator.isAlpha(value);
      },
      message: "{VALUE} is not valid"
    }
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
  fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: { type: String, required: [true, "Mother's occupation is required"] },
  motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
  contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
  address: { type: String, required: [true, "Local guardian's address is required"] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "user id is required"],
    unique: true,
    ref: 'User'
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => {
        validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email type"
    }
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "{VALUE} is not a valid blood group",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  gurdian: { type: gurdianSchema, required: [true, "Guardian information is required"] },
  localGurdian: { type: localGurdianSchema, required: [true, "Local guardian information is required"] },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester"
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true
  }
});
// virtual
studentSchema.virtual('fullName').get(function () {
  return (`${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`);
})
// document middleware / hook

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next();
})
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next();
})
// Aggregation middleware
// [ {$match: {isDeleted: {$ne: true}}} ,{ '$match': { id: '111345e3f35f1' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
})

// creating static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}
// creating an instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser;
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
