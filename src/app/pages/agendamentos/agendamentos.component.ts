import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';  // Serviço para chamadas de API
import { DoadorService } from '../../services/doador.service';  // Serviço para buscar doadores
import { agendamento } from '../../models/agendamento';

import toastr from 'toastr';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-agendamentos',
  standalone: false,
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {
  agendamentoForm!: FormGroup;
  doadores: any[] = [];
  agendamentos: any[] = [];


  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private doadorService: DoadorService
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDoadores();
    this.carregarAgendamentos();
  }

  iniciarForm(): void {
    this.agendamentoForm = this.fb.group({
      nome: [''],
      cpf: [''],
      dataNascimento: [''],
      telefone: [''],
      tipoSanguineo: [''],
      data: ['', [Validators.required, this.validarData]],
      localColeta: ['', Validators.required],
      observacoes: ['']
    });
  }

  validarData(control: any): { [key: string]: boolean } | null {
    if (new Date(control.value) < new Date()) {
      return { 'dataInvalida': true };
    }
    return null;
  }

    montarFormulario(): Observable<agendamento> {
    const novoAgendamento = new agendamento();

    return this.doadorService.recuperaDoador(this.agendamentoForm.get('cpf')!.value).pipe(
      map((doador: any) => {
        novoAgendamento.doador = {
          nome: doador.nome,
          cpf: this.agendamentoForm.get('cpf')?.value,
          dataNascimento: doador.dataNascimento,
          telefone: doador.telefone,
          tipoSanguineo: doador.tipoSanguineo
        };
        novoAgendamento.data = this.agendamentoForm.get('data')?.value;
        novoAgendamento.localColeta = this.agendamentoForm.get('localColeta')?.value;
        novoAgendamento.observacoes = this.agendamentoForm.get('observacoes')?.value;

        console.log('Novo Agendamento:', novoAgendamento);
        return novoAgendamento;
      })
    );
  }

  carregarDoadores(): void {
    this.doadorService.recuperaDoadores().subscribe({
      next: (doadores: any[]) => {
        this.doadores = doadores;
        console.log('Doadores:', this.doadores);
      },
      error: (error) => {
        console.error('Erro ao carregar doadores:', error);
      }

    });
  }

  carregarAgendamentos(): void {
    this.agendamentoService.recuperaAgendamento().subscribe((agendamentos: any[]) => {
      console.log('Agendamentos:', agendamentos);
      this.agendamentos = agendamentos;
    });
  }

    criarAgendamento(): void {
    if (this.agendamentoForm.valid) {
      this.montarFormulario().subscribe({
        next: (agendamento) => {
          this.agendamentoService.criarAgendamento(agendamento).subscribe({
            next: () => {
              this.carregarAgendamentos();
              this.agendamentoForm.reset();
              toastr.success('Agendamento criado com sucesso!', 'Sucesso!');
            },
            error: (error) => {
              console.error('Erro ao criar agendamento:', error);
              toastr.error('Erro ao criar agendamento.', 'Erro!');
            }
          });
        },
        error: (error) => {
          console.error('Erro ao montar formulário:', error);
        }
      });
    }
  }


  excluirAgendamento(agendamentoId: number): void {
    this.agendamentoService.excluirAgendamento(agendamentoId).subscribe({
      next: () => {
        toastr.success('Agendamento excluído com sucesso!', 'Sucesso!');
        this.carregarAgendamentos();
      },
      error: (error) => {
        toastr.error('Erro ao excluir agendamento:', 'Erro!');
      }
    });
  }
}
