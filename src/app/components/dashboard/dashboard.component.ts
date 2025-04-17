import { Component } from '@angular/core';
import { EstoqueDeSangue, EstoqueService } from '../../services/estoque.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  estoque: EstoqueDeSangue | null = null;

  public chartLabels: string[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  public chartData: number[] = [];
  public chartType: ChartConfiguration<'pie'>['type'] = 'pie';

  public chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.estoqueService.getEstoque().subscribe({
      next: (res) => {
        this.estoque = res;
        this.chartData = [
          res.totalOPositivo,
          res.totalONegativo,
          res.totalAPositivo,
          res.totalANegativo,
          res.totalBPositivo,
          res.totalBNegativo,
          res.totalABPositivo,
          res.totalABNegativo
        ];
      },
      error: (err) => console.error('Erro ao buscar estoque:', err)
    });
  }
}
