import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/envrionments/envrionmets.dev';
import { Router } from '@angular/router';
import { mLoginUserDetails } from '../Models/mLoginUserDetails';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient,private router:Router) { }
readonly authDirectory:string="Auth";

signIn(data:any){
  return this.http.post(`${environment.ServiceUrl}${this.authDirectory}`,data);
}

setToken(token: string) {
  if (token != null && token != '') {
    localStorage.setItem('Token', token);
  }
}

setUserDetails(userDetails: mLoginUserDetails) {
  if (userDetails != null) {
    localStorage.setItem('UserDetails', JSON.stringify(userDetails));
  }
}

getUserDetails(): mLoginUserDetails {
  var userDetal = JSON.parse(localStorage.getItem('UserDetails') as any);
  return userDetal;
}

getToken() {
  var token =
    localStorage.getItem('Token') == null
      ? ''
      : localStorage.getItem('Token');
  return token == null ? null : token;
}


isLogin() {
  var token =
    localStorage.getItem('Token') == null
      ? null
      : localStorage.getItem('Token');
  return token == null ? false : true;
}

logOut() {
  localStorage.removeItem('Token');
  localStorage.clear();
  this.router.navigateByUrl("/login");
  return;
}
}
