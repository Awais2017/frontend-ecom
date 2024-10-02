import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './Services/Auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from './Services/product.service';
import { AuthIntercepotor } from './AuthInterceptors/authInterceptors';
import { ProdCatComponent } from './Moduels/Admin/prod-cat/prod-cat.component';
import { LoginComponent } from './Moduels/Auth/login/login.component';
import { ListingComponent } from './Moduels/Products/listing/listing.component';
import { AdminComponent } from './Moduels/Admin/admin/admin.component';
import { CartService } from './Services/cart.service';
import { CartComponent } from './Moduels/Products/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdCatComponent,
    ListingComponent,
    CartComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-center',})
  ],
  providers: [AuthService,ProductService,CartService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepotor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
