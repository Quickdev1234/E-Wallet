import { Schema, model } from "mongoose";

interface IPancard {
  userId: Schema.Types.ObjectId;
  panNumber: string;
  fullName: string;
  dateOfBirth: Date;
  type: string;
  fatherName: string;
  address: string;
}

const panSchema = new Schema<IPancard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["Individual", "Company", "Trust", "HUF", "Other"],
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

export const PancardModel = model<IPancard>("Pancards", panSchema);
