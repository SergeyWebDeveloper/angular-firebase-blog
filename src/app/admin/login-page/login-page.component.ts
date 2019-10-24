import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {IUser} from '../../shared/interfaces/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  });

  constructor(private auth: AuthService, private router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const formValue = this.loginForm.value as IUser;
    this.auth.login(formValue).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
