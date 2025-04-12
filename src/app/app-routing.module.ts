import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { DoacoesComponent } from './pages/doacoes/doacoes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroDoadorComponent } from './pages/doadores/cadastro/cadastro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: DashboardComponent },
  { path: 'doadores/cadastrar', component: CadastroDoadorComponent },
  { path: 'doacoes', component: DoacoesComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
