
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Cedar',
    price: 42,
    description: 'A deep, mysterious blend of ancient cedarwood and night-blooming jasmine.',
    notes: ['Cedarwood', 'Jasmine', 'Amber'],
    image: 'https://images.unsplash.com/photo-1602873145311-48250444b9a4?q=80&w=800',
    category: 'Woody'
  },
  {
    id: '2',
    name: 'Santorini Breeze',
    price: 38,
    description: 'Crisp sea salt combined with sun-drenched citrus and wild sage.',
    notes: ['Sea Salt', 'Bergamot', 'Sage'],
    image: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800',
    category: 'Fresh'
  },
  {
    id: '3',
    name: 'Velvet Rose',
    price: 45,
    description: 'Damask rose petals layered over dark oud and velvet musk.',
    notes: ['Rose', 'Oud', 'Musk'],
    image: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?q=80&w=800',
    category: 'Floral'
  },
  {
    id: '4',
    name: 'Spiced Ember',
    price: 40,
    description: 'The warmth of a crackling fire with hints of cinnamon and smoked vanilla.',
    notes: ['Cinnamon', 'Vanilla', 'Smoke'],
    image: 'https://images.unsplash.com/photo-1572726710708-21bc91573bbb?q=80&w=800',
    category: 'Spicy'
  }
];
