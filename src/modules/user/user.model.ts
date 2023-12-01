import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../app/config";
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        maxlength: [20, "password cannot be more than 20 characters"]
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook: we will save the data');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next();
})
userSchema.post('save', function (doc, next) {
    // console.log(this, 'post hook: we saved the data');
    doc.password = '';
    next();
})
export const User = model<TUser>('User', userSchema)