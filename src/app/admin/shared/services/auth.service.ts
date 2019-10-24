import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../../shared/interfaces/User';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(user: IUser): Observable<any> {
    return this.http.post('', user);
  }

  logout() {
  }

  get token() {
    return '';
  }

  isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  private setToken() {

  }

}
