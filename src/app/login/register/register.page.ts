import { Component, Injector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private toast: ToastService, private authService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    const user = this.registerForm.getRawValue();
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.toast.showErrorToast('passwords do not match');
      return;
    }

    this.authService.register(user).subscribe(() => {
      this.toast.showSuccessToast('user created');
      this.router.navigate(['/login']);
    });
  }

}
