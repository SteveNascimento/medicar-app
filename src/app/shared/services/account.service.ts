import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestLogin } from '../../core/models/IRequestLogin';
import { Observable, map, catchError } from 'rxjs'
import { IRequestRegister } from '../../core/models/IRequestRegister';
import { IResponseLogin } from '../../core/models/IResponseLogin';
import { IResponseRegister } from '../../core/models/IResponseRegister';
import { HandleErrors } from 'src/app/core/helpers/HandleErrors';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API = `${environment.URL}`;

  constructor(
    private httpServer: HttpClient,
    private errorHandler: HandleErrors,
  ) { }

  public getToken() {
    let token = window.localStorage.getItem('token')
    if (token) {
      return token;
    } else {
      return '';
    }
  }

  public setToken(token: string) {
    window.localStorage.setItem('token', token)
  }

  public login(user: IRequestLogin): Observable<IResponseLogin> { 
    return this.httpServer.post<IResponseLogin>(`${this.API}/users/login`,{...user}).pipe(
      catchError(err => {
        this.errorHandler.showMessage(err.status)
        throw err;
      }),
      map(value => value)
    );
  }

  public logout() {
    window.localStorage.removeItem('token');
  }
  
  public register(user: IRequestRegister): Observable<IResponseRegister> {
    return this.httpServer.post<IResponseRegister>(`${this.API}/users`, {...user}).pipe(
      catchError(err => {
        this.errorHandler.showMessage(err.status)
        throw err;
      }),
      map(value => value)
    );
  }

}
