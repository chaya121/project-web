import mongoose, { Schema, Document, Types } from 'mongoose';


export interface IComment extends Document {
request: Types.ObjectId;
user: Types.ObjectId;
message: string;
}


const CommentSchema: Schema<IComment> = new Schema(
{
request: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
message: { type: String, required: true }
},
{ timestamps: true }
);


CommentSchema.index({ request: 1 });


export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);
export default CommentModel;