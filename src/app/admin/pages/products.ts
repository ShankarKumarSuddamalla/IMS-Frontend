import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../services/admin-product.service';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

type Section =
  | 'NONE'
  | 'VIEW'
  | 'ADD_CATEGORY'
  | 'ADD_PRODUCT'
  | 'UPDATE_PRODUCT'
  | 'DELETE_PRODUCT';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {

  activeSection: Section = 'NONE';

  categories: Category[] = [];
  products: Product[] = [];

  // Category form
  newCategory = { name: '', description: '' };

  // Product form
  productForm = {
    id: null as number | null,
    name: '',
    description: '',
    price: 0,
    categoryId: null as number | null
  };

  selectedCategoryId: number | null = null;
  isEditMode = false;

  constructor(private productService: AdminProductService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  // ---------- LOAD ----------
  loadCategories() {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // ---------- UI CONTROL ----------
  show(section: Section) {
    this.activeSection = section;
    this.resetForm();
  }

  // ---------- CATEGORY ----------
  addCategory() {
    this.productService.addCategory(this.newCategory).subscribe(() => {
      this.newCategory = { name: '', description: '' };
      this.loadCategories();
      alert('Category added');
    });
  }

  // ---------- PRODUCT ----------
  saveProduct() {
    if (this.isEditMode===true && this.productForm.id!==null) {
      this.productService
        .updateProduct(this.productForm.id, this.productForm)
        .subscribe(() => {
          this.resetForm();
          this.loadProducts();
          alert('Product updated');
        });
    } else {
      this.productService.addProduct(this.productForm).subscribe(() => {
        this.resetForm();
        this.loadProducts();
        alert('Product added');
      });
    }
  }

  editProduct(product: Product) {
    const category = this.categories.find(c => c.name === product.category);

    this.productForm = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: category?.id || null
    };

    this.isEditMode = true;
    this.activeSection = 'UPDATE_PRODUCT';
  }

  deleteProduct(id: number) {
    if (!confirm('Delete product?')) return;

    this.productService.deleteProduct(id).subscribe({
        next: ()=>{
            this.products = this.products.filter(p => p.id !== id);
            this.loadProducts();
            alert('Product deleted');
        },
        error:()=>{
            alert('Failed to delete product');
        }
      
    });
  }

  resetForm() {
    this.productForm = {
      id: null,
      name: '',
      description: '',
      price: 0,
      categoryId: null
    };
    this.isEditMode = false;
  }

  filteredProducts(): Product[] {
    if (!this.selectedCategoryId) return this.products;

    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    return this.products.filter(p => p.category === category?.name);
  }
}