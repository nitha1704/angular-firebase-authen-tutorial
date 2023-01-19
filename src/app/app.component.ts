import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-login';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    initializeApp(firebaseConfig)

 
    this.authService.handleFirstLogout();
  }

}
