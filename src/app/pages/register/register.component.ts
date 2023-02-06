import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;

  showPassword: boolean = false;
  passwordEye = faEye;
  passwordEyeSlash = faEyeSlash;

  showConfirmPassword: boolean = false;
  confirmPasswordEye = faEye;
  confirmPasswordEyeSlash = faEyeSlash;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeCartService();
  }

  subscribeCartService() {
    this.authService.getIsLoading().subscribe((value) => {
      this.isLoading = value;
    });
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
            Validators.pattern(/^[A-Za-z][A-Za-z0-9]*$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.customFormValidation }
    );
  }

  customFormValidation: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const email = control.get('email');
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (confirmPassword?.errors && !confirmPassword.errors['MustMatch']) {
      return null;
    }
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ MustMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    if (email?.value === 'qwes@hotmail.com') {
      email?.setErrors({ mustNotBeQwes: true });
    } else {
      email?.setErrors(null);
    }
    return null;
  };

  handleRegister() {
    this.authService.handleRegister(this.registerForm);
  }
  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  handleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get email(): any {
    return this.registerForm.get('email');
  }
  get password(): any {
    return this.registerForm.get('password');
  }
  get confirmPassword(): any {
    return this.registerForm.get('confirmPassword');
  }
}
