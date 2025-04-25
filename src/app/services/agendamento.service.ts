import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Agendamento } from '../models/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/Agendamento`;  // Altere para a URL da sua API

  constructor(private http: HttpClient) { }

  recuperaAgendamento(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/`);
  }
  recuperaAgendamentoAutenticado(id: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/${id}`);
  }

  criarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.apiUrl}`, agendamento);
  }

  excluirAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
