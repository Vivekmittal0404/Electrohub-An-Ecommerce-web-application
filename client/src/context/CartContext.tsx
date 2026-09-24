import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CART_STORAGE_KEY = "electrohub-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemKey = (item: Pick<Product, "_id" | "id" | "name">) =>
    String(item._id ?? item.id ?? item.name);

  const addToCart = (product: Product) => {
    const productId = getItemKey(product);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => getItemKey(item) === productId,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          getItemKey(item) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => getItemKey(item) !== String(id)),
    );
  };

  const increaseQuantity = (id: string | number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        getItemKey(item) === String(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string | number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getItemKey(item) === String(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce(
      (total, item) => total + Number(item.price || 0) * item.quantity,
      0,
    );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
    }),
    [cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
