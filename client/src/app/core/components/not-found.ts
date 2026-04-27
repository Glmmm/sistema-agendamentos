import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ButtonModule],
  selector: 'app-not-found',
  styles: ``,
  template: `
    <div class="flex flex-col justify-center">
      <h1 class="text-6xl text-center text-red-500">404</h1>
      <p class="text-center px-96 p-8">
        de algum jeito você chegou aqui, mas não se preocupe, é só clicar no botão abaixo para
        voltar para a página inicial :)
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
export class NotFoundComponent {
  router = inject(Router);

  public goHome() {
    this.router.navigate(['/home']);
  }
}
