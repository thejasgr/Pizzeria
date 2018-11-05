import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  ingredients: [];
  topping: [];
  pizzaArray = new Array();
  ingredientsArray = new Array();
  count = 0;
  countArray = new Array();
  ingredienttopping = new Array();
  orderArray = new Array();
  addonArray = new Array();
  totalArray = new Array();
  quantArray = new Array();
  checked: false;



  constructor(private pizza: HttpService, private router: Router, private toast: MatSnackBar) { }

  ngOnInit() {
    this.pizza.getpizzainfo().subscribe((res: []) => {
      this.pizzaArray = res;
      for (let i = 0; i < this.pizzaArray.length; i++) {
        this.countArray[i] = 1;
        this.addonArray.push(0);
        this.totalArray[i] = this.pizzaArray[i].price;
      }
    });
    this.pizza.getingredientsinfo().subscribe((resp: []) => {
      this.ingredientsArray = resp;
    });

    console.log(this.countArray);


  }
  addToCart(pizzaid) {
    this.toast.open('Added to cart', 'Okay', { duration: 3000 });
    const totalAddOnPrice = this.addonArray[pizzaid - 1] * this.countArray[pizzaid - 1];
    const totalBasePrice = this.totalArray[pizzaid - 1] * this.countArray[pizzaid - 1];

    this.pizza.addToCart(pizzaid, this.ingredienttopping[pizzaid - 1],
      totalAddOnPrice, totalBasePrice, this.countArray[pizzaid - 1]).subscribe((res1) => {
        console.log(res1);
      });

  }
  addToOrder(status, pizzaid, ingName, price) {
    console.log(status);
    console.log(this.orderArray);
    if (this.orderArray.length == 0) {
      console.log('pizza' + this.pizzaArray.length);
      for (let i = 0; i < this.pizzaArray.length; i++) {
        this.orderArray.push(i + 1);
        this.ingredienttopping.push([]);

      }
      console.log(this.orderArray);
    }
    const index = this.orderArray.indexOf(pizzaid);

    console.log(index);
    if (status) {

      if (!(this.ingredienttopping[index].includes(ingName))) {
        this.ingredienttopping[index].push(ingName);
        this.addonArray[index] += price;

      }
      console.log(this.ingredienttopping);
    } else {
      if (this.ingredienttopping[index].includes(ingName)) {
        console.log('working' + index);
        const ingIndex = this.ingredienttopping[index].indexOf(ingName);
        this.ingredienttopping[index].splice(ingIndex, 1);
        this.addonArray[index] -= price;
        console.log(this.ingredienttopping);


      }
    }
  }

  routeToCart() {
    this.router.navigate(['ShoppingCart']);
  }
  quantIncrease(pizzId) {
    console.log(pizzId);
    this.countArray[pizzId - 1]++;
  }

  quantDecrease(pizzId) {
    console.log(pizzId);
    if (this.countArray[pizzId - 1] > 1) {
      this.countArray[pizzId - 1]--;
    }

  }

}
