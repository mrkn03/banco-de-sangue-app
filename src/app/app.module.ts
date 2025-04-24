import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DoacoesComponent } from './pages/doacoes/doacoes.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastroDoadorComponent } from './pages/doadores/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgChartsModule } from 'ng2-charts';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoacoesComponent,
    AgendamentosComponent,
    HeaderComponent,
    FooterComponent,
    CadastroDoadorComponent,
    EstatisticasComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgChartsModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
