import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formType:string="Cat";
  constructor(private catService:CategoryService,private toaster:ToastrService,private prodService:ProductService,private authService:AuthService) { }

  ngOnInit() {
  }

  formSelection(type:string){
    this.formType=type
  }

  onLogOut(){
    this.authService.logOut();
  }

  catFormSubmit(event:any){
    if(this.formType=="Cat"){
      this.catService.addCategory(event).subscribe((res:any)=>{
        if(res.status==1){
          this.toaster.success(res.message);
        }
      })
    }else{
      this.prodService.AddProduct(event).subscribe((res:any)=>{
        if(res.status==1){
          this.toaster.success(res.message);
        }
      })
    }
  }

}
