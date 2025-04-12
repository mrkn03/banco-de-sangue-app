import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doador {
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

  cadastrar(doador: Doador) : Observable<any>{
    return this.http.post(this.api, doador);
  }
}
