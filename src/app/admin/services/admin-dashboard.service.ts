import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<any[]>('http://localhost:8080/user-service/users/customers');
  }

  getSuppliers() {
    return this.http.get<any[]>('http://localhost:8080/user-service/users/suppliers');
  }

  getProducts() {
    return this.http.get<any[]>('http://localhost:8080/product-service/products');
  }

  getOrders() {
    return this.http.get<any[]>('http://localhost:8080/order-service/orders');
  }
}