import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoadorService } from '../../../services/doador.service';

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
      cpfDoador: ['', [Validators.required, Validators.minLength(11)]],
      dataNascimento: ['', Validators.required],
      telefone: [''],
      tipoSanguineo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.doadorForm.invalid) return;

    this.doadorService.cadastrar(this.doadorForm.value).subscribe({
      next: () => alert('Doador cadastrado com sucesso!'),
      error: err => alert('Erro ao cadastrar doador.')
    });
  }
}
