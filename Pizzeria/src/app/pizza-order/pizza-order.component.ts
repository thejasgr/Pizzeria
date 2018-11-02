import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { element } from 'protractor';


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
  /*  pizzaCounter = new Array();
  totalPizza: number; */
  ingredienttopping = new Array();
  orderArray = new Array();

  constructor(private pizza: HttpService, private router: Router) { }

  ngOnInit() {
    this.pizza.getpizzainfo().subscribe((res: []) => {
      this.pizzaArray = res;
      /*     res.forEach(e => {
            this.orderArray.push(this.count);
            ++this.count;
          }); */
    });
    this.pizza.getingredientsinfo().subscribe((resp) => {
      this.ingredientsArray = resp;
    });


  }
  addToCart(pizzaid) {
    this.pizza.addToCart(pizzaid, this.ingredienttopping[pizzaid]).subscribe((res1) => {
      console.log(res1);
    });

  }
  addToOrder(status, pizzaid, ingid) {
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
      }
      console.log(this.orderArray);
    }
    const index = this.orderArray.indexOf(pizzaid) + 1;

    console.log(index);
    if (status) {
      // this.total=basePrice+this.total+this.price;
      if (!(this.ingredienttopping[index].includes(ingid))) {
        this.ingredienttopping[index].push(ingid);
      }
      console.log(this.ingredienttopping);
    } else {
      if (this.ingredienttopping[index].includes(ingid)) {
        this.ingredienttopping[index].splice(index, 1);
      }
    }
  }

  routeToCart() {
    this.router.navigate(['ShoppingCart']);
  }

}
