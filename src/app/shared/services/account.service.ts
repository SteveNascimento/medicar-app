import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API = `${environment.URL}`;

  constructor(private httpServer: HttpClient) { }

  public login(user: {username: string, password: string}) {    
    return this.httpServer.post(`${this.API}/users/login`,{...user});
  }
  
  public register(user: {username: string, email: string, password: string}) {
    return this.httpServer.post(`${this.API}/users`, {...user});
  }
}
