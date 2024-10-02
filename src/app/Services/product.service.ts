import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/envrionments/envrionmets.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly ProductDirectory:string="Products";
constructor(private http:HttpClient) { }

getAllProducts(){
  return this.http.get(`${environment.ServiceUrl}${this.ProductDirectory}/GetAllProducts`);
}

AddProduct(data:any){
  return this.http.post(`${environment.ServiceUrl}${this.ProductDirectory}/AddProduct`,data);
}

}
