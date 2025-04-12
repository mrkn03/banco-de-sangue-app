import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EstoqueDeSangue {
  id: number;
  totalEstoque: number;
  totalOPositivo: number;
  totalONegativo: number;
  totalAPositivo: number;
  totalANegativo: number;
  totalBPositivo: number;
  totalBNegativo: number;
  totalABPositivo: number;
  totalABNegativo: number;
}

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private api = `${environment.apiUrl}/Estoque`;

  constructor(private http: HttpClient) {}

  getEstoque(): Observable<EstoqueDeSangue> {
    return this.http.get<EstoqueDeSangue>(this.api);

  }
}
