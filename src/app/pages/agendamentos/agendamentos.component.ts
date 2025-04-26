import { Component } from '@angular/core';

import { Doador, DoadorService } from '../../services/doador.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/Agendamento';

@Component({
  selector: 'app-agendamentos',
  standalone: false,
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css'
})
export class AgendamentosComponent {
  agendamentos: Agendamento[] = [];
  doadores: Doador[] = [];
  novoAgendamento: Agendamento = new Agendamento();

  constructor(
    private agendamentoService: AgendamentoService,
    private doadorService: DoadorService
  ) {}

  ngOnInit(): void {
    this.carregarDoadores();
    this.carregarAgendamentos();
  }

  carregarDoadores(): void {
    this.doadorService.recuperaDoadores().subscribe(
      (data: Doador[]) => {
        this.doadores = data;
      },
      (error) => {
        console.error('Erro ao carregar doadores', error);
      }
    );
  }

  carregarAgendamentos(): void {
    this.agendamentoService.recuperaAgendamento().subscribe(
      (data: Agendamento[]) => {
        this.agendamentos = data;
      },
      (error) => {
        console.error('Erro ao carregar agendamentos', error);
      }
    );
  }

  criarAgendamento(): void {
    if (this.novoAgendamento.DoadorId && this.novoAgendamento.Data) {
      this.agendamentoService.criarAgendamento(this.novoAgendamento).subscribe(
        (data: Agendamento) => {
          this.agendamentos.push(data);
          this.novoAgendamento = new Agendamento();
        },
        (error) => {
          console.error('Erro ao criar agendamento', error);
        }
      );
    } else {
      alert('Preencha todos os campos.');
    }
  }

  excluirAgendamento(id: number): void {
    this.agendamentoService.excluirAgendamento(id).subscribe(
      () => {
        this.agendamentos = this.agendamentos.filter((item) => item.AgendamentoId !== id);
      },
      (error) => {
        console.error('Erro ao excluir agendamento', error);
      }
    );
  }
}
