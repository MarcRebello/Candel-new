
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: string[];
  image: string;
  category: 'Woody' | 'Floral' | 'Fresh' | 'Spicy';
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppRoute {
  HOME = '/',
  SHOP = '/shop',
  ASSISTANT = '/ai-assistant',
  CHECKOUT = '/checkout'
}
