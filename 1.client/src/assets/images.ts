// Logo
import logo from './logo_webshop.png';

// Available images
import women4 from './women4.jpg';
import women2 from './women2.jpg';
import abstract from './abstract.jpg';
import glasses from './glasses.jpg';
import reactLogo from './react.svg';
import favicon from './favicon.png';

// Export all available images
export {
  // Logo
  logo,
  
  // Product images
  women4,
  women2,
  abstract,
  glasses,
  reactLogo,
  favicon
};

// Map of product types to images for easy reference
export const productImages = {
  smartphone: abstract,
  headphones: glasses,
  smartwatch: women2,
  tshirt: women4,
  lamp: abstract,
  facecream: glasses,
  default: abstract
};

// Helper function to get product image
export const getProductImage = (productType: string) => {
  return productImages[productType as keyof typeof productImages] || productImages.default;
};
