import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductType } from "../types";

/*----- Define the cart item type with quantity -----*/
export interface CartItem {
  id: number;
  product_name: string;
  img_url?: string;
  product_details: string;
  price: number;
  category_id: number;
  subcategory_id: number;
  list_type: "new-arrival" | "featured";
  quantity: number;
  inStock?: boolean; // Added for compatibility with UI components
}

/*----- Define the cart state -----*/
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/*----- Define action types -----*/
type CartAction =
  | { type: "ADD_ITEM"; payload: ProductType }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

/*----- Define the context type -----*/
interface CartContextType {
  cart: CartState;
  addItem: (product: ProductType) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

/*----- Create the context -----*/
const CartContext = createContext<CartContextType | undefined>(undefined);

/*----- Initial state -----*/
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

/*----- Calculate cart totals -----*/
const calculateCartTotals = (
  items: CartItem[]
): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (totals, item) => {
      return {
        totalItems: totals.totalItems + item.quantity,
        totalPrice: totals.totalPrice + item.price * item.quantity,
      };
    },
    { totalItems: 0, totalPrice: 0 }
  );
};

/*----- Cart reducer -----*/
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity (max 10)
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = Math.min(item.quantity + 1, 10);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
          inStock: true, // Default to true for now
        };
        const updatedItems = [...state.items, newItem];
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        /*----- If quantity is 0 or negative, remove the item -----*/
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

/*----- Provider component -----*/
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  /*----- Actions -----*/
  const addItem = (product: ProductType) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  /*----- Create value object -----*/
  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/*----- Custom hook for using the cart context -----*/
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
