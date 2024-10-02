import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mLoginUserDetails } from 'src/app/Models/mLoginUserDetails';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted: boolean = false;
  userDetails: mLoginUserDetails = new mLoginUserDetails();
  constructor(
    private toster: ToastrService,
    private router:Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userDetails = this.authService.getUserDetails();
      if(this.userDetails.role=="Admin"){
        this.router.navigateByUrl("/admin");
      }else{
        this.router.navigateByUrl("/prod-list");
      }
    }
  }

  submitForm() {
    this.formSubmitted=true;
    if(this.loginForm.valid){
      this.authService.signIn(this.loginForm.value).subscribe((res:any)=>{
        this.userDetails.name = res.name;
        this.userDetails.email = res.email;
        this.userDetails.role=res.role;
        this.authService.setToken(res.token);
        this.authService.setUserDetails(this.userDetails);
        if(res.role=="Admin"){
          this.router.navigateByUrl("/admin");
        }else{
          this.router.navigateByUrl("/prod-list");

        }
        this.toster.success("Login Successfull");
      })
    }
  }
}
