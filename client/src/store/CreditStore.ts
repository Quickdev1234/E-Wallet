import { create } from "zustand";

type CreditCard = {
  cardId: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  ccv: string;
  bankName: string;
};

type CreditCardStore = {
  currentCreditCard: CreditCard | null;
  resetCreditCard: () => void;
};

export const useCreditCardStore = create<CreditCardStore>((set) => ({
  currentCreditCard: {
    cardId: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    ccv: "",
    bankName: "",
  },
  resetCreditCard: () =>
    set({
      currentCreditCard: {
        cardId: "",
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        ccv: "",
        bankName: "",
      },
    }),
}));
