import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdCatComponent } from './Moduels/Admin/prod-cat/prod-cat.component';
import { LoginComponent } from './Moduels/Auth/login/login.component';
import { CartComponent } from './Moduels/Products/cart/cart.component';
import { ListingComponent } from './Moduels/Products/listing/listing.component';
import { AuthGuard } from './AuthGaurd/auth.guard';
import { AdminComponent } from './Moduels/Admin/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',

    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate:[AuthGuard],
    component: AdminComponent
  },
  {
    path: 'prod-cat',
    canActivate:[AuthGuard],
    component: ProdCatComponent
  },
  {
    path: 'prod-list',
    canActivate:[AuthGuard],
    component: ListingComponent
  },
  {
    path: 'cart-list',
    canActivate:[AuthGuard],
    component: CartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
