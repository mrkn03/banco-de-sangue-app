import { Component, OnInit, OnDestroy } from "@angular/core";
import { Chart } from "chart.js";
import { DoacaoService } from "../../services/doacao.service";
import { EstoqueDeSangue, EstoqueService } from "../../services/estoque.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  estoque!: EstoqueDeSangue;
  doacoesPorPeriodo: any[] = [];
  private doacoesChart: Chart | undefined;
  private estoqueChart: Chart | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private estoqueService: EstoqueService,
    private doacaoService: DoacaoService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  ngOnDestroy(): void {
    // Emit a value to complete the subject and unsubscribe
    this.destroy$.next();
    this.destroy$.complete();

    // Destrói os gráficos
    this.doacoesChart?.destroy();
    this.estoqueChart?.destroy();
  }

  carregarDados(): void {
    this.estoqueService.getEstoque()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: EstoqueDeSangue) => {
          this.estoque = data;
          this.criarGraficoEstoque();
        },
        error: (err) => console.error('Erro ao carregar estoque:', err)
      });

    this.doacaoService.getRecuperaDoacoes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any[]) => {
          console.log("Dados de Doações:", data);
          this.doacoesPorPeriodo = data;
          this.criarGraficoDoacoes();
        },
        error: (err) => console.error('Erro ao carregar doações:', err)
      });
  }

  criarGraficoEstoque(): void {
    const ctx = document.getElementById('estoquePieChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Elemento canvas não encontrado para gráfico de estoque');
      return;
    }

    this.estoqueChart?.destroy();  // Destrói gráfico existente

    this.estoqueChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
        datasets: [{
          data: [
            this.estoque.totalOPositivo,
            this.estoque.totalONegativo,
            this.estoque.totalAPositivo,
            this.estoque.totalANegativo,
            this.estoque.totalBPositivo,
            this.estoque.totalBNegativo,
            this.estoque.totalABPositivo,
            this.estoque.totalABNegativo
          ],
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#FF8000', '#4e73df'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = Math.round((Number(value) / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  criarGraficoDoacoes(): void {
    const periodos = this.doacoesPorPeriodo.map(item => item.mesAno);
    const doacoes = this.doacoesPorPeriodo.map(item => item.totalDoacoes);

    const ctx = document.getElementById('estoqueBarChart') as HTMLCanvasElement;


    this.doacoesChart?.destroy();

    this.doacoesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: periodos,
        datasets: [{
          label: 'Quantidade de Doações',
          data: doacoes,
          backgroundColor: '#36A2EB',
          borderColor: '#1d72b8',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
          x: { title: { display: true, text: 'Mes/Ano' } },
        }
      }
    });
  }


}
