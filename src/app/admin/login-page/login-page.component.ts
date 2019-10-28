import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {IUser} from '../../shared/interfaces/User';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  submitted = false;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  });

  constructor(public auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  openSnackBar(message) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
    });
  }

  onSubmit(event: Event) {
    this.submitted = true;
    event.preventDefault();
    const formValue = this.loginForm.value as IUser;
    this.auth.login(formValue).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      // TODO: Не работает как нужно
      this.auth.error$.subscribe(errorMessage => this.openSnackBar(errorMessage)).unsubscribe();
      this.submitted = false;
    });
  }
}
