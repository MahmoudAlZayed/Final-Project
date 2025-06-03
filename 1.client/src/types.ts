export interface CartItem {
  productId: number;
  quantity: number;
}

/*----- User type definition -----*/

export interface User {
  id: number;
  name: string;
  email: string;
}
/*----- RegisterModal type definition -----*/

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
/*----- LoginForm type definition -----*/

export interface LoginCredentials {
  email?: string;
  username?: string;
  password?: string;
}


// Mockdata & API types

export interface ProductType {
  id: number;
  product_name: string;
  img_url?: string;
  product_details: string;
  price: number;
  category_id: number;
  subcategory_id: number;
  list_type: "new-arrival" | "featured";
}
// Removed inStock: boolean; from old Product, add a state in cartItem/app.tsx

export interface ProductListType {
  id?: number; // add ID in mockdata to match
  product: number | ProductType;
  size_id: number | SizeType;
  color_id: number | ColorType;
  quantity: number;
}

export interface CustomerType {
  id?: number; // add ID in mockdata to match
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  adress: string;
  city: string;
  zip_code: string;
  phone_number: string;
}

export interface OrderType {
  id: number;
  customer_id: number | CustomerType;
  order_date: Date;
}

export interface OrderDetailType {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface CategoryType {
  id: number;
  category: string;
}

export interface SubCategoryType {
  id: number;
  subcategory: string;
}

export interface ColorType {
  id: number;
  color: string;
}

export interface SizeType {
  id: number;
  size: string;
}
