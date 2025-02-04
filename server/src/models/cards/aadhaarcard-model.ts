import { Schema, model } from "mongoose";

interface IAadhaarCard {
  userId: Schema.Types.ObjectId;
  aadhaarNumber: string;
  fullName: string;
  dateOfBirth: Date;
  mobileNumber: string;
  fatherName: string;
  address: string;
}

const AadhaarSchema = new Schema<IAadhaarCard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 12,
      maxlength: 12,
    },
    mobileNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
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

export const AadhaarcardModel = model<IAadhaarCard>(
  "Aadhaarcards",
  AadhaarSchema
);
