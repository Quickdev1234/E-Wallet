import { sign, verify, decode } from "jsonwebtoken";

export const jwt = {
  sign: (payload: any) => {
    return sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });
  },
  verify: (token: string) => {
    return verify(token, process.env.JWT_SECRET || "secret");
  },
  decode: (token: string) => {
    return decode(token);
  },
};
