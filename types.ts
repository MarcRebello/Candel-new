
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: string[];
  image: string;
  category: 'Woody' | 'Floral' | 'Fresh' | 'Spicy';
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  location: string;
}

export enum AppRoute {
  HOME = '/'
}
