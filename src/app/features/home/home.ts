import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, DividerModule, RippleModule],
  templateUrl: './home.html',
})
export class HomeComponent {
  router = inject(Router);

  funcionalidades = [
    {
      icone: 'pi pi-calendar-plus',
      titulo: 'Agendamento Descomplicado',
      descricao:
        'Permita que seus clientes reservem horários rapidamente, evitando conflitos de agenda.',
    },
    {
      icone: 'pi pi-chart-line',
      titulo: 'Relatórios Financeiros',
      descricao: 'Acompanhe o total arrecadado por período, profissional ou serviço em tempo real.',
    },
    {
      icone: 'pi pi-users',
      titulo: 'Gestão de Equipe',
      descricao:
        'Cadastre profissionais, defina seus horários de trabalho e vincule os serviços oferecidos.',
    },
    {
      icone: 'pi pi-star',
      titulo: 'Feedbacks e Retenção',
      descricao:
        'Descubra seus clientes mais frequentes e receba avaliações sobre os atendimentos.',
    },
  ];

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
