import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/envrionments/envrionmets.dev';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly OrdersDirectory: string = 'Orders';
constructor(private http:HttpClient) { }
cartItems: Subject<any> = new Subject<any>();

addOrders(data: any) {
  return this.http.post(
    `${environment.ServiceUrl}${this.OrdersDirectory}/AddOrders`,
    data
  );
}

}
