import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        address: String,
        phone: String,
        doB: {
            type: Date,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
        isRecruiter: {
            type: Boolean,
            default: false,
        },
    },
    { collection: 'users' },
);

export { UserSchema };

UserSchema.virtual('recruiters', {
    ref: 'Recruiter',
    localField: '_id',
    foreignField: 'userId',
    justOne: true,
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    doB: Date;
    isAdmin: boolean;
    isRecruiter: boolean;
}
