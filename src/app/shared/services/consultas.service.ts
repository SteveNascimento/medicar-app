import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAgenda } from '../models/IAgenda';
import { IConsulta } from '../models/IConsulta';
import { IEspecialidade } from '../models/IEspecialidade';
import { IMedico } from '../models/IMedico';
import { IResponseMarcarConsulta } from '../models/IResponseMarcarConsulta';
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
  
  public getEspecialidades(payload : {query: string} = {query: ''}): Observable<IEspecialidade[]> {
    return this.httpServer.get<IEspecialidade[]>(`${this.API}/especialidades/?search=${payload.query}`, this.accountService.getHeaders());
  }
  
  public getMedicos(payload : {query: string, especialidade: string} = {query: '', especialidade: ''}): Observable<IMedico[]> {
    return this.httpServer.get<IMedico[]>(
        `${this.API}/medicos/?search=${payload.query}&especialidade=${payload.especialidade}`,
        this.accountService.getHeaders()
      );
  }
  
  public getAgendas(payload : {especialidade: string, medico: string} = {especialidade: '', medico: ''}): Observable<IAgenda[]> {
    return this.httpServer.get<IAgenda[]>(
        `${this.API}/agendas/?especialidade=${payload.especialidade}&medico=${payload.medico}`,
        this.accountService.getHeaders()
      );
  }
  
  public marcarConsulta(payload : {agenda_id: string, horario: string} = {agenda_id: '', horario: ''}): Observable<IResponseMarcarConsulta[]> {
    return this.httpServer.post<IResponseMarcarConsulta[]>(
        `${this.API}/consultas/`, { ...payload },
        this.accountService.getHeaders()
      );
  }
}
