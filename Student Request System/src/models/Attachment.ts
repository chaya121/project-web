import mongoose, { Schema, Document, Types } from 'mongoose';


export interface IAttachment extends Document {
request: Types.ObjectId;
filename: string;
url: string;
uploadedBy?: Types.ObjectId;
}


const AttachmentSchema: Schema<IAttachment> = new Schema(
{
request: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
filename: { type: String, required: true },
url: { type: String, required: true },
uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
},
{ timestamps: true }
);


export const AttachmentModel = mongoose.model<IAttachment>('Attachment', AttachmentSchema);
export default AttachmentModel;