import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscribeAuthService();
  }

  handleLogin() {
    if (this.isLoading) {
      return;
    }
    this.authService.handleLogin(this.loginForm);
  }

  subscribeAuthService() {
    this.authService
      .getIsLoading()
      .subscribe((value) => (this.isLoading = value));
  }
}
