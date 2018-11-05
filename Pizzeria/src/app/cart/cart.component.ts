import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty = true;
  cartItems;
  grandTotal = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCart().subscribe(
      res => {
        this.cartItems = res;
        if (this.cartItems.length != 0) {
          this.isEmpty = false;
          for (let i = 0; i < this.cartItems.length; i++) {
            this.grandTotal += this.cartItems[i].total + this.cartItems[i].addOnPrice;
          }

          console.log(res);
        }

      }
    );
  }
  removeFromCart(_id) {
    this.httpService.removeCartData(_id).subscribe(res => {
      console.log(res);
    });
  }

}

