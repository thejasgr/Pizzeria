import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  postresult;
  name;
  img;
  description;
  ingredients: [];
  topping: [];
  price;
  type;
  pizzaArray = new Array();
  ingredientsArray;
  count = 0;
  countArray = new Array();
  /*  pizzaCounter = new Array();
  totalPizza: number; */
  ingredienttopping = new Array();
  orderArray = new Array();  //
  addonArray = new Array();
  totalArray = new Array();
  quantArray = new Array();



  constructor(private pizza: HttpService, private router: Router) { }

  ngOnInit() {
    this.pizza.getpizzainfo().subscribe((res: []) => {
      this.pizzaArray = res;
      for (let i = 0; i < this.pizzaArray.length; i++) {
        this.countArray[i] = 1;
      }
      /*     res.forEach(e => {
            this.orderArray.push(this.count);
            ++this.count;
          }); */
    });
    this.pizza.getingredientsinfo().subscribe((resp) => {
      this.ingredientsArray = resp;
    });

    console.log(this.countArray);


  }
  addToCart(pizzaid) {
    var totalAddOnPrice = this.addonArray[pizzaid - 1] * this.countArray[pizzaid - 1];
    var totalBasePrice = this.totalArray[pizzaid - 1] * this.countArray[pizzaid - 1];

    this.pizza.addToCart(pizzaid, this.ingredienttopping[pizzaid - 1], totalAddOnPrice, totalBasePrice).subscribe((res1) => {
      console.log(res1);
    });

  }
  addToOrder(status, pizzaid, ingName, price) {
    /*  if (this.OrderArray.length == 0 && event.target.checked) {
       this.OrderArray.push(pizzaname);
       this.OrderArray.push(ingname);
     } else if (event.target.checked) {
       this.OrderArray.push(ingname);
     } else if (!event.target.checked) {
       const deleteindex = this.OrderArray.indexOf(ingname);
       this.OrderArray.splice(deleteindex, 1);
     } */

    console.log(status);
    console.log(this.orderArray);
    if (this.orderArray.length == 0) {
      console.log('pizza' + this.pizzaArray.length);
      for (let i = 0; i < this.pizzaArray.length; i++) {
        this.orderArray.push(i + 1);
        this.ingredienttopping.push([]);
        this.addonArray[i] = 0;
        this.totalArray[i] = this.pizzaArray[i].price;

      }
      console.log(this.orderArray);
    }
    const index = this.orderArray.indexOf(pizzaid);

    console.log(index);
    if (status) {
      // this.total=basePrice+this.total+this.price;
      if (!(this.ingredienttopping[index].includes(ingName))) {
        this.ingredienttopping[index].push(ingName);
        this.addonArray[index] += price;
        // this.totalArray[index] += price;
      }
      console.log(this.ingredienttopping);
    } else {
      if (this.ingredienttopping[index].includes(ingName)) {
        this.ingredienttopping[index].splice(index, 1);
        this.addonArray[index] -= price;
        // this.totalArray[index] -= price;
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
