import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { CustomerOrderService } from '../../services/customer-order.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CustomerCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  placingOrder = false;

  constructor(
    private cartService: CartService,
    private orderService: CustomerOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    console.log('Cart items: ',this.cartItems);
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  increase(id: number) {
    this.cartService.increaseQuantity(id);
    this.loadCart();
  }

  decrease(id: number) {
    this.cartService.decreaseQuantity(id);
    this.loadCart();
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  total(): number {
    return this.cartService.getTotalAmount();
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    this.placingOrder = true;

    this.orderService.placeOrder(this.cartItems).subscribe({
      next: () => {
        this.cartService.clearCart();
        alert('Order placed successfully');
        this.router.navigate(['/customer/orders']);
      },
      error: () => {
        alert('Failed to place order');
        this.placingOrder = false;
      }
    });
  }
}