import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doacao } from '../models/doacao';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  private apiUrl = `${environment.apiUrl}/Doacao`

  constructor(private http: HttpClient) { }



  realizarDoacao(doacao: Doacao): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/realizar-doacao`, doacao);
  }

  getDoacoesPorPeriodo(ano:number, mes?: number): Observable<any> {

    if (mes) {
      return this.http.get<any[]>(`${this.apiUrl}/doacoes-por-periodo?ano=${ano}&mes=${mes}`);
    }else{
      return this.http.get<any[]>(`${this.apiUrl}/doacoes-por-periodo?ano=${ano}`);
    }

  }

  getRecuperaDoacoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recupera-doacoes`);
  }
}
