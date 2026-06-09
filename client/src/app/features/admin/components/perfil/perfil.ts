import { Component, inject, computed } from '@angular/core';
import { AuthStore } from '../../../auth/auth.store';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.html',
})
export class PerfilComponent {
  private authStore = inject(AuthStore);

  public user = computed(() => this.authStore.user()?.data);
}
