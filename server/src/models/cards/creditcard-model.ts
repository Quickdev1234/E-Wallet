//@ts-nocheck
import { Schema, model } from "mongoose";
import crypto from "crypto";
import { decrypt, encrypt } from "../../lib/encrtpt-decrypt";

interface ICards {
  userId: Schema.Types.ObjectId;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: string;
  ccv: string;
  bankName: string;
}

const creditCardSchema = new Schema<ICards>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      select: false,
    },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardType: {
      type: String,
      required: true,
      default: "Credit",
    },
    ccv: {
      type: String,
      required: true,
      select: false,
    },
    bankName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.cardNumber) {
          ret.maskedCardNumber = `****-****-****-${ret.cardNumber.slice(-4)}`;
          delete ret.cardNumber;
        }
        delete ret.ccv;
        return ret;
      },
    },
  }
);

creditCardSchema.pre("save", function (next) {
  try {
    if (this.isModified("cardNumber")) {
      this.cardNumber = encrypt(this.cardNumber);
    }
    if (this.isModified("ccv")) {
      this.ccv = encrypt(this.ccv);
    }
    next();
  } catch (error) {
    next(error);
  }
});

creditCardSchema.methods.decryptCardDetails = function () {
  const obj = this.toObject();
  try {
    if (obj.cardNumber) {
      obj.cardNumber = decrypt(obj.cardNumber);
    }
    if (obj.ccv) {
      obj.ccv = decrypt(obj.ccv);
    }
    return obj;
  } catch (error) {
    throw new Error("Failed to decrypt card details");
  }
};

creditCardSchema.statics.findCardWithFullDetails = function (cardId) {
  return this.findById(cardId).select("+cardNumber +ccv");
};

export const CreditCardModel = model<ICards>("CreditCards", creditCardSchema);
