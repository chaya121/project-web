import mongoose, { Schema, Document, Types } from 'mongoose';


export type RequestStatus =
| 'DRAFT'
| 'SUBMITTED'
| 'IN_REVIEW'
| 'NEED_INFO'
| 'APPROVED'
| 'REJECTED'
| 'CLOSED';


export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';


export interface IRequest extends Document {
title: string;
description: string;
status: RequestStatus;
priority: Priority;
tags: string[];
student: Types.ObjectId;
assignedStaff?: Types.ObjectId | null;
attachments: Types.ObjectId[];
commentsCount: number;
deadline?: Date | null;
slaDays?: number | null;
closedAt?: Date | null;
}


const RequestSchema: Schema<IRequest> = new Schema(
{
title: { type: String, required: true, trim: true },
description: { type: String, required: true },
status: {
type: String,
enum: ['DRAFT', 'SUBMITTED', 'IN_REVIEW', 'NEED_INFO', 'APPROVED', 'REJECTED', 'CLOSED'],
default: 'SUBMITTED'
},
priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
tags: [{ type: String }],
student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
assignedStaff: { type: Schema.Types.ObjectId, ref: 'User', default: null },
attachments: [{ type: Schema.Types.ObjectId, ref: 'Attachment' }],
commentsCount: { type: Number, default: 0 },
deadline: { type: Date, default: null },
slaDays: { type: Number, default: null },
closedAt: { type: Date, default: null }
},
{ timestamps: true }
);


RequestSchema.index({ status: 1, priority: -1, createdAt: -1 });
RequestSchema.index({ student: 1 });


RequestSchema.methods.incComments = async function (): Promise<void> {
this.commentsCount += 1;
await this.save();
};


export const RequestModel = mongoose.model<IRequest>('Request', RequestSchema);
export default RequestModel;