import { create, type StateCreator } from "zustand";

type SheetContent = "CART" | "SEARCH" | null

export interface GlobalState {
  isSheetOpen: boolean;
  sheetContent: SheetContent

  // Navbar Mobile
  activeNavMobile: boolean;
  setActiveNavMobile: (active: boolean) => void;

  openSheet: (content: SheetContent) => void;
  closeSheet: () => void;
}

const storeApi: StateCreator<GlobalState> = (set) => ({
  isSheetOpen: false,
  sheetContent: null,
  activeNavMobile: false,

  setActiveNavMobile: (active) => {
    set({activeNavMobile: active})
  },

  openSheet: (content) => {
    set({isSheetOpen: true, sheetContent: content})
  },
  closeSheet: () => {
    set({isSheetOpen: false, sheetContent: null})
  },
})

export const useGlobalStore = create<GlobalState>()(storeApi)
