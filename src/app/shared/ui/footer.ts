import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  imports: [DividerModule],
  template: ` <p-divider></p-divider>
    <footer>
      <div class="py-12">
        <div class="text-center text-slate-400 text-sm">
          <p>© 2026 Sistema de Agendamento. Desenvolvido por Guilherme Papa.</p>
        </div>
      </div>
    </footer>`,
})
export class FooterComponent {}
