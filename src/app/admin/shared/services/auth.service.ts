import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IFirebaseAuthResponse, IUser} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    this.setToken(null);
  }

  get token(): string {
    const expiresDate = new Date(localStorage.getItem('expires-token'));
    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого Email не существует');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
    }
    return throwError(error);
  }

  isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  private setToken(response: IFirebaseAuthResponse | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + (+response.expiresIn) * 1000);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('expires-token', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }

}
