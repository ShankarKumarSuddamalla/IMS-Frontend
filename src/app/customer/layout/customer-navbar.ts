import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  templateUrl: './customer-navbar.html',
  styleUrls: ['./customer-navbar.css']
})
export class CustomerNavbarComponent implements OnInit {

  customerName = 'Customer';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomerName();
  }

  loadCustomerName() {
    this.http.get<any>('http://localhost:8080/user-service/users/me')
      .subscribe({
        next: (res) => this.customerName = res.name,
        error: () => this.customerName = 'Customer'
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}