import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoacaoService } from '../../services/doacao.service';
import toastr from 'toastr';
import { Doacao } from '../../models/doacao';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-doacoes',
  standalone: false,
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.css'
})
export class DoacoesComponent {

  doacaoForm!: FormGroup;
  doadores: any[] = [];
  doacoes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private doacaoServico: DoacaoService
  ) {

  }

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm(): void {
    this.doacaoForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      quantidadeML: ['', [Validators.required, Validators.min(1), Validators.max(5000)]],
    });
  }

  montarFormulario(): Doacao {
    const { cpf, quantidadeML } = this.doacaoForm.value;

    const doacao: Doacao = { cpf, quantidadeML };

    return doacao;
  }

  enviarDoacao(): void {
    if (!this.doacaoForm.valid) {
      toastr.warning('Formulário inválido. Verifique os campos.');
      return;
    }



    this.doacaoServico.realizarDoacao(this.montarFormulario()).subscribe({
      next: () => {
        toastr.success('Doação realizada com sucesso!');
        this.doacaoForm.reset();
      },
      error: (error) => {
        toastr.error('Erro ao realizar doação');
        console.log(error)
      }
    })

    this.doacaoForm.reset();

  }

}
