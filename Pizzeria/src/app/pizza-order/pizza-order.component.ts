import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


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
  pizzaArray;


  constructor(private getpizza: HttpService) { }

  ngOnInit() {
    this.getpizza.getpizzainfo().subscribe((res) => {
      this.pizzaArray = res;
      console.log(res);
      /*   this.pizzaArray.forEach((element: any) => {
          this.name = element.name;
          this.type = element.type;
          this.img = element.image;
          this.description = element.description;
          this.ingredients = element.ingredients;
          this.topping = element.topping;
          this.price = element.price;
      }); */

    });
  }

}
