import { create } from "zustand";

type AadhaarCard = {
  cardId: string;
  aadhaarNumber: string;
  fullName: string;
  dateOfBirth: string;
  mobileNumber: string;
  fatherName: string;
  address: string;
};

type AadhaarCardStore = {
  currentAadhaarCard: AadhaarCard | null;
  resetAadhaarCard: () => void;
};

export const useAadhaarCardStore = create<AadhaarCardStore>((set) => ({
  currentAadhaarCard: {
    cardId: "",
    aadhaarNumber: "",
    fullName: "",
    dateOfBirth: "",
    mobileNumber: "",
    fatherName: "",
    address: "",
  },
  resetAadhaarCard: () =>
    set({
      currentAadhaarCard: {
        cardId: "",
        aadhaarNumber: "",
        fullName: "",
        dateOfBirth: "",
        mobileNumber: "",
        fatherName: "",
        address: "",
      },
    }),
}));
