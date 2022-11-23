import { Document, Schema } from 'mongoose';

const ApplicationSchema = new Schema(
    {
        newsId: {
            type: Schema.Types.ObjectId,
            ref: 'News',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        CV: String,
        status: {
            type: String,
            default: 'pending',
        },
        intro: String,
    },
    { timestamps: true, collection: 'applications' },
);

export { ApplicationSchema };

export interface Application extends Document {
    newsId: string;
    userId: string;
    CV: string;
    status: string;
    intro: string;
}
