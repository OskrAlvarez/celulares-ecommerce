import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware"
import type { ICartItem } from "../components/CartItem";

export interface CartState {
  items: ICartItem[];
  totalItems: number;
  totalAmount: number;

  addItem: (item: ICartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  cleanCart: () => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  addItem: (item) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.variantId === item.variantId
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        // Si existe en el carrito, actualizamos cantidad
        updatedItems = state.items.map((i, index) =>
          index === existingItemIndex
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            : i
        );
      } else {
        // Si el item no existe, añadelo
        updatedItems = [...state.items, item];
      }

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItems: newTotalItems,
      };
    });
  },
  removeItem: (variantId) => {
    set((state) => {
      const updatedItems = state.items.filter(i => i.variantId !== variantId);
      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItems: newTotalItems,
      };
    });
  },
  updateQuantity: (variantId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map(i =>
        i.variantId === variantId
          ? {...i, quantity}
          : i
      );
      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItems: newTotalItems,
      };
    });
  },
  cleanCart: () => {
    set({ items: [], totalAmount: 0, totalItems: 0 });
  },
});

export const useCartStore = create<CartState>()(persist(storeApi, {
  name: 'cart-store'
}));
