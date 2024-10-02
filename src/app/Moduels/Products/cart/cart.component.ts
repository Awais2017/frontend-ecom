import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() refreshResults= new EventEmitter<any>()
  cartItems:any[]=[]
  /**
   *
   */
  constructor(private cartService:CartService,private toaster:ToastrService) {
    this.cartService.cartItems.subscribe(items => {
      if(!this.cartItems.includes(items)){
        items.noOfItems=1;
        this.cartItems.push(items);
      }else{
        this.cartItems.find(x=>x.id==items.id).noOfItems=this.cartItems.find(x=>x.id==items.id).noOfItems+1;
      }
    })
  }
  ngOnInit(): void {

  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getTotalAmount(){
    var total=0;
    this.cartItems.forEach(x=>{
      total=total+ x.noOfItems*x.amount;
    })
    return total;
  }

  onContinue(){
    console.log("all itmes==>",this.cartItems)
    var orders=this.cartItems.map(x=>{
      return {id:x.id,name:x.name,amount:x.amount,noOfItems:x.noOfItems,category:x.category}
    });
    console.log("orders==>",orders);
    this.cartService.addOrders(orders).subscribe((res:any)=>{
      if(res.status==1){
        this.toaster.success(res.message);
        this.refreshResults.emit();
      }
    })
  }

}
