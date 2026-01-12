import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../services/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalCustomers = 0;
  totalSuppliers = 0;
  totalProducts = 0;
  totalOrders = 0;

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getCustomers()
      .subscribe(data => this.totalCustomers = data.length);

    this.dashboardService.getSuppliers()
      .subscribe(data => this.totalSuppliers = data.length);

    this.dashboardService.getProducts()
      .subscribe(data => this.totalProducts = data.length);

    this.dashboardService.getOrders()
      .subscribe(data => {
        this.totalOrders = data.length;
      });
  }
}