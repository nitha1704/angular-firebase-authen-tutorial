import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { singleProductsUrl } from 'src/app/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productId!: string | null;
  productInfo: any;
  mainImg: any;
  selectedColor!: string;
  quantity: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    this.http
      .get<any>(singleProductsUrl + this.productId)
      .subscribe((value) => {
        this.productInfo = value;
        this.mainImg = value.images[0].url;
        this.selectedColor = value.colors[0];
        console.log(value);
      });
  }

  handleQuantity(type: string) {
    if (type === 'dec') {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    if (type === 'inc') {
      if (this.quantity < this.productInfo.stock) {
        this.quantity++;
      }
    }
  }

  renderStars() {
    const stars = this.productInfo?.stars;
    const newArr = Array.from({ length: 5 }, (_, index) => {
      if (stars >= index + 1) {
        return `<img src="https://www.pngfind.com/pngs/m/24-243399_full-star-yellow-yellow-star-hd-png-download.png" />`;
      } else if (stars >= index + 0.5) {
        return `<img src="https://www.pngfind.com/pngs/m/39-393173_half-star-yellow-half-a-yellow-star-hd.png" />`;
      } else {
        return `<img src="https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-empty-icon.png" />`;
      }
    }).join('');
    return newArr;
  }

  renderStars2() {
    const stars = this.productInfo?.stars;

    const newArr = Array.from({ length: 5 }, (_, index) => {
      if (stars >= index + 1) {
        return `<span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg></span>`;
      } else if (stars >= index + 0.5) {
        return `<span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"></path></svg></span>`;
      } else {
        return `<span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path></svg></span>`;
      }
   
    }).join('');
    const output = this.domSanitizer.bypassSecurityTrustHtml(newArr);

    return output;
  }
}
