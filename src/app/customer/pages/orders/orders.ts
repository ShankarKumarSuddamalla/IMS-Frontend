import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrderService } from '../../services/customer-order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class CustomerOrdersComponent implements OnInit {

  orders: Order[] = [];
  loading = false;
  error = '';

  constructor(private orderService: CustomerOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }
}