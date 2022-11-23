import { Document, Schema } from 'mongoose';

const NewsSchema = new Schema(
    {
        recruiter: {
            type: Schema.Types.ObjectId,
            ref: 'Recruiter',
        },
        title: {
            type: String,
            require: true,
        },
        field: {
            type: String,
            require: true,
        },
        desc: String,
        require: String,
        quantity: {
            type: Number,
            min: 0,
            default: 1,
        },
        benefits: String,
        submitDl: {
            type: Date,
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    { timestamps: true, collection: 'news' },
);

export { NewsSchema };

// NewsSchema.virtual('recruiters', {
//     ref: 'Recruiter',
//     localField: 'recruiter',
//     foreignField: '_id',
//     justOne: true,
// });

// NewsSchema.virtual('applications', {
//     ref: 'Appliation',
//     localField: '_id',
//     foreignField: 'newsId',
//     justOne: false,
// });

export interface News extends Document {
    recruiter: string;
    title: string;
    field: string;
    desc: string;
    require: string;
    quantity: number;
    benefits: string;
    submitDl: Date;
}
