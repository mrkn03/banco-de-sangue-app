import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/Agendamento`;

  constructor(private http: HttpClient) { }

  recuperaAgendamento(): Observable<agendamento[]> {
    return this.http.get<agendamento[]>(`${this.apiUrl}/`);
  }
  recuperaAgendamentoAutenticado(id: number): Observable<agendamento[]> {
    return this.http.get<agendamento[]>(`${this.apiUrl}/${id}`);
  }

  criarAgendamento(agendamento: agendamento): Observable<any> {
    return this.http.post<agendamento>(`${this.apiUrl}`, agendamento);
  }

  excluirAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
