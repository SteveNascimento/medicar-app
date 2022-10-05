import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HandleErrors } from 'src/app/core/helpers/HandleErrors';
import { environment } from 'src/environments/environment';
import { IAgenda } from '../../core/models/IAgenda';
import { IConsulta } from '../../core/models/IConsulta';
import { IEspecialidade } from '../../core/models/IEspecialidade';
import { IMedico } from '../../core/models/IMedico';
import { IResponseMarcarConsulta } from '../../core/models/IResponseMarcarConsulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private readonly API = `${environment.URL}`;

  constructor(
    private httpServer: HttpClient,
    private errorsHandler: HandleErrors
  ) { }

  public getConsultasAgendadas(): Observable<IConsulta[]> {
    return this.httpServer.get<IConsulta[]>(`${this.API}/consultas`).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }

  public deleteConsulta(id: number): Observable<any> {
    return this.httpServer.delete<any>(`${this.API}/consultas/${id}`).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }
  
  public getEspecialidades(payload : {query: string} = {query: ''}): Observable<IEspecialidade[]> {
    return this.httpServer.get<IEspecialidade[]>(`${this.API}/especialidades/?search=${payload.query}`).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }
  
  public getMedicos(payload : {query: string, especialidade: string} = {query: '', especialidade: ''}): Observable<IMedico[]> {
    return this.httpServer.get<IMedico[]>(
        `${this.API}/medicos/?search=${payload.query}&especialidade=${payload.especialidade}`
      ).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }
  
  public getAgendas(payload : {especialidade: string, medico: string} = {especialidade: '', medico: ''}): Observable<IAgenda[]> {
    return this.httpServer.get<IAgenda[]>(
        `${this.API}/agendas/?especialidade=${payload.especialidade}&medico=${payload.medico}`
      ).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }
  
  public marcarConsulta(payload : {agenda_id: string, horario: string} = {agenda_id: '', horario: ''}): Observable<IResponseMarcarConsulta[]> {
    return this.httpServer.post<IResponseMarcarConsulta[]>(
        `${this.API}/consultas/`,
        { ...payload }
      ).pipe(
      catchError(err => {
        this.errorsHandler.showMessage(err)
        throw err;
      }),
      map(value => value)
    );
  }
}
