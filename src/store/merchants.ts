import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MerchantStore = {
  merchants: API.MerchantList;
  currentMerchant: API.Merchant;
  currentMerchantDetails: API.MerchantDetails | null;
  setMerchants: (merchants: API.MerchantList) => void;
  setCurrentMerchant: (merchant: API.Merchant) => void;
  setCurrentMerchantDetails: (merchantDetails: API.MerchantDetails) => void;
};

export const useMerchantStore = create<MerchantStore>()(
  persist(
    (set) => ({
      merchants: [],
      currentMerchant: { id: 0, businessName: "", merchantCode: "" },
      currentMerchantDetails: null,
      setMerchants: (merchants: API.MerchantList) =>
        set({ merchants: merchants }),
      setCurrentMerchant: (merchant: API.Merchant) =>
        set({ currentMerchant: merchant }),
      setCurrentMerchantDetails: (merchantDetails: API.MerchantDetails) =>
        set({ currentMerchantDetails: merchantDetails }),
    }),

    {
      name: "merchant-store", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state: MerchantStore) => ({
        merchants: state.merchants,
        currentMerchant: state.currentMerchant,
        currentMerchantDetails: state.currentMerchantDetails,
      }),
    },
  ),
);
