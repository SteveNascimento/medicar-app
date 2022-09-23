import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestLogin } from '../models/IRequestLogin';
import { IRequestRegister } from '../models/IRequestRegister';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API = `${environment.URL}`;

  constructor(private httpServer: HttpClient) { }

  public getToken() {
    let token = window.localStorage.getItem('token')
    if (token) {
      return token;  
    } else {
      return '';
    }
  }

  public getHeaders() {
    return ({headers: { "Authorization": `Token ${this.getToken()}` }});
  }

  public login(user: IRequestLogin) { 
    return this.httpServer.post(`${this.API}/users/login`,{...user});
  }

  public logout() {    
    window.localStorage.removeItem('token');
  }
  
  public register(user: IRequestRegister) {
    return this.httpServer.post(`${this.API}/users`, {...user});
  }

}
