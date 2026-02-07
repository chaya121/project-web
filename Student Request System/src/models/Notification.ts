import mongoose, { Schema, Document, Types } from 'mongoose';


export interface INotification extends Document {
user: Types.ObjectId;
title: string;
message?: string;
read: boolean;
meta?: any;
}


const NotificationSchema: Schema<INotification> = new Schema(
{
user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
message: { type: String },
read: { type: Boolean, default: false },
meta: { type: Schema.Types.Mixed, default: {} }
},
{ timestamps: true }
);


export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
export default NotificationModel;