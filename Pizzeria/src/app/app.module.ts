import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { BuildUrPizzaComponent } from './build-ur-pizza/build-ur-pizza.component';
import { CartComponent } from './cart/cart.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    PizzaOrderComponent,
    BuildUrPizzaComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatCardModule, FormsModule, HttpClientModule, RouterModule.forRoot(
      [
        {
          path: '', component: HomeScreenComponent
        },
        {
          path: 'OrderPizza', component: PizzaOrderComponent
        },
        {
          path: 'BuildUrPizza', component: BuildUrPizzaComponent
        },
        {
          path: 'ShoppingCart', component: CartComponent
        }
      ]
    )
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
