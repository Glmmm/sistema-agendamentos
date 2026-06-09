import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../../features/auth/auth.store';
import { ERoles } from '../../shared/models/roles';

@Component({
  imports: [ButtonModule],
  selector: 'app-page-not-found',
  styles: ``,
  template: `
    <div class="flex flex-col justify-center my-8">
      <h1 class="text-6xl text-center text-red-500 rounded bg-red-950">404...</h1>
      <p class="text-center px-96 p-8">
        de algum jeito você chegou aqui, mas não se preocupe, é só clicar no botão abaixo para
        voltar a página inicial :)
      </p>
      <p-button
        label="Go Home"
        class="self-center"
        variant="outlined"
        severity="primary"
        (click)="goHome()"
      ></p-button>
    </div>
  `,
})
export class PageNotFoundComponent {
  store = inject(AuthStore);
  router = inject(Router);

  public goHome() {
    if (this.store.user()?.type == ERoles.ADMIN) {
      this.router.navigate(['/admin']);
      return;
    }
    this.router.navigate(['/client']);
  }
}
