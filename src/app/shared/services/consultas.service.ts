import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConsulta } from '../models/IConsulta';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private readonly API = `${environment.URL}`;

  constructor(
    private httpServer: HttpClient,
    private accountService: AccountService
  ) { }

  public getConsultasAgendadas(): Observable<IConsulta[]> {
    return this.httpServer.get<IConsulta[]>(`${this.API}/consultas`, {...this.accountService.getHeaders()});
  }

  public deleteConsulta(id: number): Observable<any> {
    return this.httpServer.delete<any>(`${this.API}/consultas/${id}`, this.accountService.getHeaders());
  }
}
