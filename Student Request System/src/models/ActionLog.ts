import mongoose, { Schema, Document, Types } from 'mongoose';


export interface IActionLog extends Document {
request: Types.ObjectId;
action: string;
actor: Types.ObjectId;
fromStatus?: string | null;
toStatus?: string | null;
note?: string | null;
}


const ActionLogSchema: Schema<IActionLog> = new Schema(
{
request: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
action: { type: String, required: true },
actor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
fromStatus: { type: String, default: null },
toStatus: { type: String, default: null },
note: { type: String, default: null }
},
{ timestamps: true }
);


ActionLogSchema.index({ request: 1, createdAt: -1 });


export const ActionLogModel = mongoose.model<IActionLog>('ActionLog', ActionLogSchema);
export default ActionLogModel;