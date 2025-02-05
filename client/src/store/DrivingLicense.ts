import { create } from "zustand";

type DrivingLicense = {
  cardId: string;
  licenseNumber: string;
  fullName: string;
  dateOfBirth: string;
  issueDate: string;
  expiryDate: string;
  address: string;
};

type DrivingLicenseStore = {
  currentDrivingLicense: DrivingLicense | null;
  resetDrivingLicense: () => void;
};

export const useDrivingLicenseStore = create<DrivingLicenseStore>((set) => ({
  currentDrivingLicense: {
    cardId: "",
    licenseNumber: "",
    fullName: "",
    dateOfBirth: "",
    issueDate: "",
    expiryDate: "",
    address: "",
  },
  resetDrivingLicense: () =>
    set({
      currentDrivingLicense: {
        cardId: "",
        licenseNumber: "",
        fullName: "",
        dateOfBirth: "",
        issueDate: "",
        expiryDate: "",
        address: "",
      },
    }),
}));
