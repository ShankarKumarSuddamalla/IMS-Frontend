import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'customer_cart';

  getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(product: Product) {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }

    this.saveCart(cart);
  }

  increaseQuantity(productId: number) {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      item.quantity++;
      this.saveCart(cart);
    }
  }

  decreaseQuantity(productId: number) {
    const cart = this.getCart();
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      this.saveCart(cart);
    }
  }

  removeItem(productId: number) {
    const cart = this.getCart().filter(i => i.product.id !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  getTotalAmount(): number {
    return this.getCart()
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}