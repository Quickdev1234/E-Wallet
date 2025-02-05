import { create } from "zustand";

type VoterId = {
  cardId: string;
  voterId: string;
  fullName: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
};

type VoterIdStore = {
  currentVoterId: VoterId | null;
  resetVoterId: () => void;
};

export const useVoterIdStore = create<VoterIdStore>((set) => ({
  currentVoterId: {
    cardId: "",
    voterId: "",
    fullName: "",
    dateOfBirth: "",
    fatherName: "",
    address: "",
  },
  resetVoterId: () =>
    set({
      currentVoterId: {
        cardId: "",
        voterId: "",
        fullName: "",
        dateOfBirth: "",
        address: "",
        fatherName: "",
      },
    }),
}));
