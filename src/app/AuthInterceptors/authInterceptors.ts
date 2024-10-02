import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "../Services/Auth.service";

@Injectable()
export class AuthIntercepotor implements HttpInterceptor {

  constructor(private authService:AuthService,
    private toastr:ToastrService,private router:Router,
    ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request;
    let res: any;
    let newToken: any;
    let token = this.authService.getToken();
    if (token != null) {
      if(req.url.includes("/Login")){
        // req = req.clone({ setHeaders: { "Access-Control-Allow-Origin":"*" } });
      }else{
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
    }
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status==200) {
            res = evt;
            // if (res.headers.has("NewToken")) {
            //   newToken = res.headers.get("NewToken");
            //   this.authService.setToken(newToken);
            // }
          }
          if (evt.status == 500) {
            this.toastr.error("Something Went Wrong", "Error");
          }
          if (evt.status == 401) {
            this.router.navigate([""]);
          }
        }
        if (evt instanceof HttpErrorResponse) {
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.toastr.error("Session Expired");
      this.authService.logOut();
      return throwError(()=>error);
    }
    if (error.status === 500) {
      return throwError(()=>error);
    }
    if (error.status == 404) {
      return throwError(()=>error);
    }
    if (error.status == 400) {
      return throwError(()=>error);
    }
    if (error.status == 504) {
      return throwError(()=>error);
    }
    return throwError(()=>error);
  }

}
