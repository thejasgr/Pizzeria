import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty = true;
  cartItems = new Array();
  grandTotal = 0;

  constructor(private httpService: HttpService, private toast: MatSnackBar) { }

  ngOnInit() {
    this.httpService.getCart().subscribe(
      (res: []) => {
        this.cartItems = res;
        console.log(res);
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
    this.toast.open('Pizza removed', 'Okay', { duration: 2000 });
    this.httpService.removeCartData(_id).subscribe(res => {
      console.log(res);
    });
  }

}

