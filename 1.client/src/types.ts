// Product type definition
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  inStock: boolean;
}

// Cart item type definition
export interface CartItem {
  productId: number;
  quantity: number;
}

// User type definition
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


