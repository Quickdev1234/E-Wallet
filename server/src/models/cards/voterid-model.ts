import { Schema, model } from "mongoose";

interface IVoterID {
  userId: Schema.Types.ObjectId;
  voterId: string;
  fullName: string;
  dateOfBirth: Date;
  fatherName: string;
  address: string;
}

const voterIdSchema = new Schema<IVoterID>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voterId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },

    fatherName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const VoterIdModel = model<IVoterID>("voterId", voterIdSchema);
