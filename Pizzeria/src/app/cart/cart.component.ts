import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isEmpty = true;
  /* name;
  img;
  description;
  ingredients: [];
  topping: [];
  price;
  type;
  pizzaArray = new Array();
  ingredientsArray;
  cartArray;
  displaycart = new Array();
  constructor(private pizza: HttpService) { }

  ngOnInit() {
    this.pizza.getpizzainfo().subscribe((res: []) => {
      this.pizzaArray = res;
    });
    this.pizza.getingredientsinfo().subscribe((resp) => {
      this.ingredientsArray = resp;
    });
    this.pizza.getCart().subscribe((res) => {
      this.cartArray = res;
      console.log(res);
      for (const responseiterator of this.cartArray) {
        for (const iterator of this.pizzaArray) {
          if (responseiterator.pizzaid == iterator.id) {
            this.displaycart.push([iterator, responseiterator.ingredients]);
            break;
          }
        }
        // this.displaycart.push(responseiterator.ingredients);
      }

      /* for (const iterator of this.cartArray) {
        for (const pizzaiterator of this.pizzaArray) {
          if (iterator.pizzaorder[0] == pizzaiterator.name) {
            this.displaycart.push(pizzaiterator);
            break;
          }
        }
        if (iterator.pizzaorder.length > 0) {
          for (let index = 1; index < iterator.pizzaorder.length; index++) {
            this.displaycart.push(iterator.pizzaorder[index]);
          }
        }

      } */

  /* });
  console.log(this.displaycart);
}
*/
  cartItems;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCart().subscribe(
      res => {
        this.cartItems = res;
        console.log(res);
      }
    );
  }
  removeFromCart() {

  }

}

