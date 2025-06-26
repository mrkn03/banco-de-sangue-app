import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroDoadorComponent } from './pages/doadores/cadastro/cadastro.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { DoacoesComponent } from './pages/doacoes/doacoes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doadores/cadastrar', component: CadastroDoadorComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
  { path: 'estatisticas', component: EstatisticasComponent },
  { path: 'doacoes', component: DoacoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
