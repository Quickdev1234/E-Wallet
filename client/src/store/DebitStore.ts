import { create } from "zustand";

type DebitCard = {
  cardId: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  ccv: string;
  bankName: string;
};

type DebitCardStore = {
  currentDebitCard: DebitCard | null;
  resetDebitCard: () => void;
};

export const useDebitCardStore = create<DebitCardStore>((set) => ({
  currentDebitCard: {
    cardId: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    ccv: "",
    bankName: "",
  },
  resetDebitCard: () =>
    set({
      currentDebitCard: {
        cardId: "",
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        ccv: "",
        bankName: "",
      },
    }),
}));
