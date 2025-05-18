import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doador {
DoadorId: any;
  nome: string;
  cpf: string;
  idade: number;
  telefone: string;
  tipoSanguineo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoadorService {

  private api = `${environment.apiUrl}/Doador`;

  constructor(private http: HttpClient) { }

  cadastrarDoador(doador: Doador) : Observable<any>{
    return this.http.post(this.api, doador);
  }

  recuperaDoadores(): Observable<Doador[]> {
    return this.http.get<Doador[]>(this.api);
  }

  recuperaDoador(cpf: number): Observable<Doador> {
    return this.http.get<Doador>(`${this.api}/${cpf}`);
  }
}
