import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { BuildUrPizzaComponent } from './build-ur-pizza/build-ur-pizza.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    PizzaOrderComponent,
    BuildUrPizzaComponent,
    CartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
