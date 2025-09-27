import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, Product } from '@/types';

interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            
            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          } else {
            // Add new item
            const newItem: CartItem = { product, quantity };
            const updatedItems = [...state.items, newItem];
            
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            
            return {
              items: updatedItems,
              totalItems,
              totalPrice,
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.product.id !== productId);
          
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          return {
            items: updatedItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
