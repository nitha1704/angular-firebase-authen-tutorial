import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscribeAuthService();
  }

  subscribeAuthService() {
    this.authService
      .getIsAuthenticated()
      .subscribe((value) => (this.isAuthenticated = value));
  }

  handleLogout() {
    this.authService.handleLogout();
  }

  logAuth(){
    this.authService.logAuth();
    console.log(
      'this.authService.isAuthenticated',
      this.authService.isAuthenticated.value
    );
  };
}
