import { create } from "zustand";

type PanCard = {
  cardId: string;
  panNumber: string;
  fullName: string;
  dateOfBirth: string;
  type: string;
  fatherName: string;
  address: string;
};

type PanCardStore = {
  currentPanCard: PanCard | null;
  resetPanCard: () => void;
};

export const usePanCardStore = create<PanCardStore>((set) => ({
  currentPanCard: {
    cardId: "",
    panNumber: "",
    fullName: "",
    dateOfBirth: "",
    type: "",
    fatherName: "",
    address: "",
  },
  resetPanCard: () =>
    set({
      currentPanCard: {
        cardId: "",
        panNumber: "",
        fullName: "",
        dateOfBirth: "",
        type: "",
        fatherName: "",
        address: "",
      },
    }),
}));
