import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DoadorService } from '../../../services/doador.service';
import Swal from 'sweetalert2';

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
      cpfDoador: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required, Validators.pattern(/^\d{11}$/)],
      tipoSanguineo: ['', Validators.required]
    });
  }

  cadastrarUsuario(): void {
    if (this.doadorForm.invalid) return;

    this.doadorService.cadastrarDoador(this.doadorForm.value).subscribe({
      next: () => Swal.fire({
        title: 'Sucesso',
        text: 'Usuário cadastrado com sucesso!',
        icon: 'success'
      }),
      error: err => {
        console.error(err);
        Swal.fire({
          title: 'Erro',
          text: 'Erro ao cadastrar usuário!',
          icon: 'error'
        });
      }
    });
  }
}
