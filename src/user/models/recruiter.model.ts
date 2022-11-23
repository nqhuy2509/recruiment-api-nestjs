import { Document, Schema } from 'mongoose';
import { User } from './user.model';

const RecruiterSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            require: true,
        },
        desc: String,
        image: String,
    },
    {
        timestamps: true,
        collection: 'recruiters',
    },
);

export { RecruiterSchema };

RecruiterSchema.virtual('users', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

RecruiterSchema.virtual('news', {
    ref: 'News',
    localField: '_id',
    foreignField: 'recruiter',
    justOne: false,
});

export interface Recruiter extends Document {
    userId: User;
    name: string;
    desc: string;
    image: string;
}
