import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestLogin } from '../models/IRequestLogin';
import { Observable, EMPTY, map, catchError } from 'rxjs'
import { IRequestRegister } from '../models/IRequestRegister';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponseLogin } from '../models/IResponseLogin';
import { IResponseRegister } from '../models/IResponseRegister';

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

  public handleErrors(e: any) {
    let codeError = e.status
    switch (codeError) {
      case 403:
        this._snackBar.open("Acesso negado!", "Dispensar")
        break;
      case 404:
        this._snackBar.open("Não encontrado!", "Dispensar")
        break;
      case 503:
        this._snackBar.open("Serviço indisponível!", "Dispensar")
        break;
      case 504:
        this._snackBar.open("Erro de conexão!", "Dispensar")
        break;
      default:
        break;
    }
    return EMPTY;
  }

  public getHeaders() {
    return ({headers: { "Authorization": `Token ${this.getToken()}` }});
  }

  public login(user: IRequestLogin): Observable<IResponseLogin> { 
    return this.httpServer.post<IResponseLogin>(`${this.API}/users/login`,{...user});
  }

  public logout() {    
    window.localStorage.removeItem('token');
  }
  
  public register(user: IRequestRegister): Observable<IResponseRegister> {
    return this.httpServer.post<IResponseRegister>(`${this.API}/users`, {...user});
  }

}
