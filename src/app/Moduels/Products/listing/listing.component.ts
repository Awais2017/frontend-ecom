import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/Auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  products:any[]=[];
  showCart:boolean=false;
/**
 *
 */
constructor(
  private productService:ProductService,
  private toaster:ToastrService,
  private router:Router,
  private authService:AuthService,
  private cartService:CartService ) {

}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((res:any)=>{
      if(res.status==1){
        this.products=res.data;
      }else{
        this.products=[];
      }
    },err=>{
      this.toaster.error("Something went wrong!");
    })
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onLogOut(){
    this.authService.logOut();
  }


  onRefresh(){
    this.getAllProducts();
    this.showCart=false;
  }

  onAddCart(product:any){
    this.showCart=true;
    this.cartService.cartItems.next(product);

    // this.router.navigateByUrl("/cart-list");
  }
}
