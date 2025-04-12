import { Component } from '@angular/core';
import { EstoqueDeSangue, EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  estoque: EstoqueDeSangue | null = null;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.estoqueService.getEstoque().subscribe({
      next: res => this.estoque = res,
      error: err => console.error('Erro ao buscar estoque:', err)
    });
  }

  tipos() {
    return [
      { nome: 'O+', valor: this.estoque?.totalOPositivo || 0 },
      { nome: 'O-', valor: this.estoque?.totalONegativo || 0 },
      { nome: 'A+', valor: this.estoque?.totalAPositivo || 0 },
      { nome: 'A-', valor: this.estoque?.totalANegativo || 0 },
      { nome: 'B+', valor: this.estoque?.totalBPositivo || 0 },
      { nome: 'B-', valor: this.estoque?.totalBNegativo || 0 },
      { nome: 'AB+', valor: this.estoque?.totalABPositivo || 0 },
      { nome: 'AB-', valor: this.estoque?.totalABNegativo || 0 }
    ];
  }
}
