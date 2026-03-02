import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserRole = 'student' | 'staff' | 'admin';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['student', 'staff', 'admin'],
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

/* =========================
   HASH PASSWORD BEFORE SAVE
========================= */
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* =========================
   COMPARE PASSWORD METHOD
========================= */
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;