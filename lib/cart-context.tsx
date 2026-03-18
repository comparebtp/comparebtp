"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface CartItem {
  productId: number;
  productName: string;
  productSlug: string;
  storeId: number;
  storeName: string;
  storeChain: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: number, storeId: number) => void;
  updateQuantity: (productId: number, storeId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalByStore: Record<string, { storeName: string; total: number; items: CartItem[] }>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("comparebtp-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("comparebtp-cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.storeId === item.storeId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.storeId === item.storeId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number, storeId: number) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.storeId === storeId))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, storeId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, storeId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.storeId === storeId
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalByStore = items.reduce(
    (acc, item) => {
      const key = item.storeChain;
      if (!acc[key]) {
        acc[key] = { storeName: item.storeName, total: 0, items: [] };
      }
      acc[key].total += item.price * item.quantity;
      acc[key].items.push(item);
      return acc;
    },
    {} as Record<string, { storeName: string; total: number; items: CartItem[] }>
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalByStore }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
