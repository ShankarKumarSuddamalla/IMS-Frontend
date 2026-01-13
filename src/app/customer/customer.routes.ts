import { Routes } from '@angular/router';
import { CustomerNavbarComponent } from './layout/customer-navbar';
import { AuthGuard } from '../guards/auth.guard';

import { CustomerProductsComponent } from './pages/products/products';
import { CustomerCartComponent } from './pages/cart/cart';
import { CustomerOrdersComponent } from './pages/orders/orders';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: 'customer',
    component: CustomerNavbarComponent,
    canActivate: [AuthGuard],
    data: { role: 'CUSTOMER' },
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: CustomerProductsComponent },
      { path: 'cart', component: CustomerCartComponent },
      { path: 'orders', component: CustomerOrdersComponent }
    ]
  }
];