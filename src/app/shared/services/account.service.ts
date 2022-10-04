import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestLogin } from '../../core/models/IRequestLogin';
import { Observable, EMPTY, map, catchError } from 'rxjs'
import { IRequestRegister } from '../../core/models/IRequestRegister';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponseLogin } from '../../core/models/IResponseLogin';
import { IResponseRegister } from '../../core/models/IResponseRegister';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API = `${environment.URL}`;

  constructor(
    private httpServer: HttpClient,
    private _snackBar: MatSnackBar,
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

  public handleErrors(status: 0 | 401 | 403 | 404 | 503 | 504 ) {

    const errors = {
      0: "Problema nos servidores!",
      401: "Usuário ou senha incorretos",
      403: "Acesso negado!",
      404: "Não encontrado!",
      503: "Serviço indisponíveis",
      504: "Erro de conexão!"
    }

    this._snackBar.open(errors[status], "Dispensar")

    return EMPTY;
  }

  public login(user: IRequestLogin): Observable<IResponseLogin> { 
    return this.httpServer.post<IResponseLogin>(`${this.API}/users/login`,{...user}).pipe(
      catchError(err => {
        console.log(err.status);
        
        this.handleErrors(err.status)
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
        console.log(err.status);
        
        //this.handleErrors(err.status)
        throw err;
      }),
      map(value => value)
    );
  }

}
