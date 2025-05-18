import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DoadorService } from '../../../services/doador.service';
import toastr from 'toastr';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroDoadorComponent {
  doadorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doadorService: DoadorService
  ) {
    this.doadorForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required, Validators.pattern(/^\d{11}$/)],
      tipoSanguineo: ['', Validators.required]
    });
  }

  transformarData(data: string): string {
    const partes = data.split('-');
    return `${partes[0]}-${partes[1]}-${partes[2]}`;
  }
  transformaCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  cadastrarUsuario(): void {
    if (this.doadorForm.invalid) return;

    console.log(this.doadorForm.value);

    const dataFormatada = this.transformarData(this.doadorForm.get('dataNascimento')!.value);
    this.doadorForm.get('dataNascimento')!.setValue(dataFormatada);

    this.doadorService.cadastrarDoador(this.doadorForm.value).subscribe({
      next: () => toastr.success('Usuário cadastrado com sucesso!'),
      error: err => {
        console.error(err);
        toastr.error('Erro ao cadastrar usuário!');
      }
    })
  }
}
