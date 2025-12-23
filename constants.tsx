
import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Cedar',
    price: 42,
    description: 'A deep, mysterious blend of ancient cedarwood and night-blooming jasmine, designed for evening contemplation.',
    notes: ['Cedarwood', 'Jasmine', 'Amber'],
    image: 'https://images.unsplash.com/photo-1602873145311-48250444b9a4?q=80&w=800',
    category: 'Woody'
  },
  {
    id: '2',
    name: 'Santorini Breeze',
    price: 38,
    description: 'Capturing the essence of the Aegean coast with crisp sea salt and sun-drenched citrus.',
    notes: ['Sea Salt', 'Bergamot', 'Sage'],
    image: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800',
    category: 'Fresh'
  },
  {
    id: '3',
    name: 'Velvet Rose',
    price: 45,
    description: 'An opulent journey through a blooming garden, grounded by the dark, smoky notes of rare oud.',
    notes: ['Rose', 'Oud', 'Musk'],
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?q=80&w=800',
    category: 'Floral'
  },
  {
    id: '4',
    name: 'Spiced Ember',
    price: 40,
    description: 'The comfort of a winter hearth, blending warm cinnamon with the sweetness of smoked vanilla.',
    notes: ['Cinnamon', 'Vanilla', 'Smoke'],
    image: 'https://images.unsplash.com/photo-1572726710708-21bc91573bbb?q=80&w=800',
    category: 'Spicy'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    content: "The scent throw of Midnight Cedar is unlike any other candle I've owned. It fills the room with a sophisticated, calming presence that lingers beautifully.",
    author: "Eleanor Vance",
    location: "London, UK"
  },
  {
    id: 't2',
    content: "Candel represents the pinnacle of artisanal craftsmanship. From the minimalist packaging to the clean burn of the soy wax, every detail is considered.",
    author: "Julian Thorne",
    location: "New York, NY"
  },
  {
    id: 't3',
    content: "Santorini Breeze transported me back to my summer in Greece. It's rare to find a fragrance that captures a memory so accurately and elegantly.",
    author: "Sofia Rossi",
    location: "Milan, Italy"
  }
];
