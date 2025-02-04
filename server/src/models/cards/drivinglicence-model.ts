import { Schema, model } from "mongoose";

interface IDrivingLicense {
  userId: Schema.Types.ObjectId;
  licenseNumber: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  issueDate: string;
  expiryDate: string;
}

const DrivingLicenseSchema = new Schema<IDrivingLicense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    licenseNumber: {
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
    address: {
      type: String,
    },
    issueDate: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
  },
  { timestamps: true }
);

export const DrivingLicenseModel = model<IDrivingLicense>(
  "DrivingLicense",
  DrivingLicenseSchema
);
