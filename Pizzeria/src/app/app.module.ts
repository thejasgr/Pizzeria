import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';



import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { CartComponent } from './cart/cart.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    PizzaOrderComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule, MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatCheckboxModule, MatButtonModule, MatGridListModule,
    MatSnackBarModule, MatCardModule, FormsModule, HttpClientModule, RouterModule.forRoot(
      [
        {
          path: '', component: HomeScreenComponent
        },
        {
          path: 'OrderPizza', component: PizzaOrderComponent
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
