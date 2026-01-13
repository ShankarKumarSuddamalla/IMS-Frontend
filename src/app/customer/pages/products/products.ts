import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerProductService } from '../../services/customer-product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-customer-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class CustomerProductsComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];
  selectedCategory = '';

  loading = false;

  constructor(
    private productService: CustomerProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.productService.getCategories()
      .subscribe(data => this.categories = data);
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
        this.loading = false;
      });
  }

  filteredProducts(): Product[] {
    if (!this.selectedCategory) return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert('Product added to cart');
  }
}