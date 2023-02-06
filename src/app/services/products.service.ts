import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<any>([]);
  filterProducts = new BehaviorSubject<any>([]);
  filter = new BehaviorSubject<any>({
    search: '',
    category: 'all',
    company: 'all',
    color: 'all',
    price: 0,
    maxPrice: 0,
  });
  search = new BehaviorSubject<any>('');
  category = new BehaviorSubject<any>([]);
  company = new BehaviorSubject<any>([]);
  color = new BehaviorSubject<any>([]);
  price = new BehaviorSubject<any>(0);
  maxPrice = new BehaviorSubject<any>(0);

  constructor() {}

  getProducts() {
    return this.products.asObservable();
  }
  getFilterProducts() {
    return this.filterProducts.asObservable();
  }
  getFilter() {
    return this.filter.asObservable();
  }
  getSearch() {
    return this.search.asObservable();
  }
  getCategory() {
    return this.category.asObservable();
  }
  getCompany() {
    return this.company.asObservable();
  }
  getColor() {
    return this.color.asObservable();
  }
  getPrice() {
    return this.price.asObservable();
  }
  getMaxPrice() {
    return this.maxPrice.asObservable();
  }
}
