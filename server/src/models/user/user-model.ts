import { Schema, model } from "mongoose";

interface IUser {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  active: boolean;
  lastLogin: Date;
}

const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    active: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await Bun.password.hash(this.password);

  next();
});

export const UserModel = model<IUser>("User", userSchema);
