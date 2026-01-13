import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  private baseUrl = 'http://localhost:8080/order-service';

  constructor(private http: HttpClient) {}

  placeOrder(cartItems: CartItem[]): Observable<any> {

    const orderRequest = {
      items: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    return this.http.post(`${this.baseUrl}/orders`, orderRequest);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/my`);
  }
}