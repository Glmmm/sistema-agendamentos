import { Directive, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

export type StatusAgendamento = 'PENDENTE' | 'CONFIRMADO' | 'CONCLUIDO' | 'CANCELADO';

@Directive({
  selector: '[appStatusBadge]',
  standalone: true,
})
export class StatusBadgeDirective implements OnChanges {
  @Input('appStatusBadge') status!: StatusAgendamento | string;

  @HostBinding('class') classList = '';

  @HostBinding('textContent') textContent = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.estilizarStatus();
    }
  }

  private estilizarStatus(): void {
    const baseClasses =
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider';

    switch (this.status) {
      case 'PENDENTE':
        this.classList = `${baseClasses} bg-amber-100 text-amber-800 border border-amber-200`;
        this.textContent = 'Pendente';
        break;
      case 'CONFIRMADO':
        this.classList = `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
        this.textContent = 'Confirmado';
        break;
      case 'CONCLUIDO':
        this.classList = `${baseClasses} bg-emerald-100 text-emerald-800 border border-emerald-200`;
        this.textContent = 'Concluído';
        break;
      case 'CANCELADO':
        this.classList = `${baseClasses} bg-rose-100 text-rose-800 border border-rose-200`;
        this.textContent = 'Cancelado';
        break;
      default:
        this.classList = `${baseClasses} bg-gray-100 text-gray-800`;
        this.textContent = this.status || 'Desconhecido';
    }
  }
}
