import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AgendamentosComponent } from './components/agendamentos/agendamentos';
import { ServicosComponent } from './components/servicos/servicos';
import { LugaresFamososComponent } from './components/lugares/lugares-famosos';
import { DividerModule } from 'primeng/divider';

@Component({
  imports: [
    CardModule,
    DividerModule,
    AgendamentosComponent,
    ServicosComponent,
    LugaresFamososComponent,
  ],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {}
