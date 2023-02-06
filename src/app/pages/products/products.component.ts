import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productsUrl, ProductsService } from 'src/app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = true;
  products: any = [];
  filteredProducts: any = [];
  filter: any = {};
  search = '';
  category = [];
  company = [];
  color = [];
  price = 0;
  maxPrice = 0;

  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subscribeProductsService();
    this.getProducts();
  }

  subscribeProductsService() {
    this.productsService.getProducts().subscribe((value) => {
      this.products = value;
    });
    this.productsService.getFilterProducts().subscribe((value) => {
      this.filteredProducts = value;
    });
    this.productsService.getFilter().subscribe((value) => {
      this.filter = value;
    });
    this.productsService.getPrice().subscribe((value) => {
      this.price = value;
    });
    this.productsService.getMaxPrice().subscribe((value) => {
      this.maxPrice = value;
    });
  }

  getProducts() {
    this.http.get<any>(productsUrl).subscribe((value) => {
      this.productsService.products.next(value);
      this.productsService.filterProducts.next(value);

      // Get colors
      let colors = value.map((x: any) => {
        return x.colors;
      });
      colors = [].concat(...colors);
      colors = [...new Set(colors)];

      // Get category, company
      let { category, company } = value.reduce(
        (acc: any, item: any) => {
          const { category, company } = item;
          if (!acc.category[category]) {
            acc.category[category] = '';
          }
          if (!acc.company[company]) {
            acc.company[company] = '';
          }
          return acc;
        },
        { category: {}, company: {} }
      );
      category = Object.keys(category);
      company = Object.keys(company);

      // Get maxPrice
      const maxPrice = Math.max(
        ...value.map((i: any) => {
          return i.price;
        })
      );

      this.category = category;
      this.company = company;
      this.color = colors;

      this.filter.price = maxPrice;
      this.filter.maxPrice = maxPrice;

      this.isLoading = false;
      console.log(this.maxPrice);
    });
  }

  handleFilter(filterName: string, e: any) {
    let value = null;

    if (filterName === 'search') {
      value = e.target.value;
    }
    if (filterName === 'category') {
      value = e.target.textContent;
    }
    if (filterName === 'company') {
      value = e.target.value;
    }
    if (filterName === 'price') {
      value = Number(e.target.value);
    }
    if (filterName === 'color') {
      value = e;
    }
    this.filter[filterName] = value;
    this.handleUiFilter();
    console.log(this.filter);
  }

  handleUiFilter() {
    let tempCart = this.products;
    console.log(tempCart);

    if (this.filter.search !== '') {
      tempCart = tempCart.filter(
        (i: any) => i.name.toLowerCase().includes(this.filter.search)
      )
    }
    if (this.filter.category !== 'all') {
      tempCart = tempCart.filter(
        (i: any) => i.category === this.filter.category
      );
    }
    if (this.filter.company !== 'all') {
      tempCart = tempCart.filter((i: any) => i.company === this.filter.company);
    }

    if (this.filter.color !== 'all') {
      tempCart = tempCart.filter((i: any) => {
        return i.colors.find((c: any) => c === this.filter.color);
      });
    }

    tempCart = tempCart.filter((i: any) => i.price <= this.filter.price);

    this.productsService.filterProducts.next(tempCart);

    console.log(tempCart);
  }
}
