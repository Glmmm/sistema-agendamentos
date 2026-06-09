import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule],
  template: `
    <p-divider class="my-6"></p-divider>

    <footer class="text-slate-600 dark:text-slate-400">
      <div class="max-w-7xl mx-auto py-6 pb-8">
        <div class="flex flex-col gap-4 text-center items-center">
          <div class="flex justify-center md:justify-end gap-4 text-lg">
            <a
              href="https://github.com/Glmmm"
              class="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <i class="pi pi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/guilherme-papa-dev/"
              class="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <i class="pi pi-linkedin"></i>
            </a>
          </div>
        </div>

        <div class="text-center text-xs pt-6 text-slate-400">
          <p>
            FEMA 2026 Sistema de Agendamento. Desenvolvido por
            <span class="font-medium  dark:text-slate-300">Guilherme Papa</span>.
          </p>
        </div>
        <p class="text-xs ">não aguento mais essa coisa</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
