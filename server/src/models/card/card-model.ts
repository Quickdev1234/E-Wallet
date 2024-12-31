//@ts-nocheck
import { Schema, model } from "mongoose";
import crypto from "crypto";

interface ICards {
  userId: Schema.Types.ObjectId;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: string;
  ccv: string;
  bankName: string;
}

// Create a 32 byte key from the provided encryption key
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY || "")
  .digest("hex")
  .slice(0, 32);

const IV_LENGTH = 16; // AES block size

function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
}

function decrypt(text: string): string {
  try {
    const [ivHex, encryptedText] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
}

const cardSchema = new Schema<ICards>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      select: false, // Don't include by default in queries
    },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardType: { type: String, required: true, enum: ["debit", "credit"] },
    ccv: {
      type: String,
      required: true,
      select: false, // Don't include by default in queries
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

// Middleware to encrypt fields before saving
cardSchema.pre("save", function (next) {
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

// Method to decrypt sensitive fields
cardSchema.methods.decryptCardDetails = function () {
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

// Static method to find card with full details
cardSchema.statics.findCardWithFullDetails = function (cardId) {
  return this.findById(cardId).select("+cardNumber +ccv");
};

export const CardModel = model<ICards>("Cards", cardSchema);
