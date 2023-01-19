import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading = new BehaviorSubject<boolean>(false);
  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  handleRegister(registerForm: FormGroup) {
    if (registerForm.status === 'INVALID') {
      registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.next(true);
    const { email, password } = registerForm.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(userCredential);
        alert('Register successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log('error', error);
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
        alert(errorCode);
      })
      .finally(() => this.isLoading.next(false));
  }

  handleLogin(loginForm: FormGroup) {
    this.isLoading.next(true);
    const { email, password } = loginForm.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.isAuthenticated.next(true);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      })
      .finally(() => this.isLoading.next(false));
  }

  handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.isAuthenticated.next(false);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  logAuth() {
    const auth = getAuth();
    console.log(auth);
  }

  handleFirstLogout() {
    const auth = getAuth();
    console.log(auth);
  }

  getIsLoading() {
    return this.isLoading.asObservable();
  }
  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
}
