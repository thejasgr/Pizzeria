import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  name;
  img;
  description;
  ingredients: [];
  topping: [];
  price;
  type;
  pizzaArray = new Array();
  ingredientsArray;
  pizzaCounter = new Array();
  totalPizza: number;


  constructor(private pizza: HttpService, private router: Router) { }

  ngOnInit() {
    this.pizza.getpizzainfo().subscribe((res: []) => {
      this.pizzaArray = res;
      this.pizza.getingredientsinfo().subscribe((resp) => {
        this.ingredientsArray = resp;
      });
      console.log(res);
      res.forEach(element => {
        this.pizzaCounter.push(0);
      });

    });
  }
  addToCart(index, id) {
    this.pizza.addToCart(id).subscribe((res) => {

    });
    this.router.navigate(['ShoppingCart']);
  }

}
