import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { DrawerModule } from 'primeng/drawer';

import { ProfissionaisService } from '../../../../core/services/admin/profissionais.service';
import { AuthHelper } from '../../../auth/auth.helper';
import { IProfissionalResponse } from '../../models/profissionais-response.model';
import { profissionaisForms } from './forms/profissionais.forms';
import { ServicosComponent } from '../servicos/servicos';
import { CargaHorariaComponent } from '../carga-horaria/carga-horaria';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.html',
  imports: [
    CargaHorariaComponent,
    ServicosComponent,
    CardModule,
    DialogModule,
    ButtonModule,
    PopoverModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DrawerModule,
  ],
})
export class ProfissionaisComponent implements OnInit {
  private service = inject(ProfissionaisService);
  private auth = inject(AuthHelper);
  private toast = inject(MessageService);
  private confirmation = inject(ConfirmationService);

  displayDialog = signal(false);
  profissionais = signal<IProfissionalResponse[]>([]);

  form = profissionaisForms();

  displayDrawer = signal(false);
  profissionalSelecionado = signal<IProfissionalResponse | null>(null);

  get isEditing(): boolean {
    return !!this.form.get('id')?.value;
  }

  ngOnInit(): void {
    this.listarProfissionais();
  }

  private getEmpresaId(): number {
    return this.auth.store.user()!.data.id;
  }

  listarProfissionais(): void {
    this.service.getProfissionalByEmpresa(this.getEmpresaId()).subscribe({
      next: (response) => this.profissionais.set(response),
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar profissionais',
        }),
    });
  }

  salvarProfissional(): void {
    if (this.form.invalid) {
      this.toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente',
      });
      return;
    }

    if (this.isEditing) {
      this.alterarProfissional();
    } else {
      this.cadastrarProfissional();
    }
  }

  private cadastrarProfissional(): void {
    const payload = { ...this.form.value, empresaId: this.getEmpresaId() };

    this.service.createProfissional(payload).subscribe({
      next: () => this.handleSuccess('Profissional cadastrado com sucesso'),
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar profissional',
        }),
    });
  }

  private alterarProfissional(): void {
    const professionalId = this.form.get('id')?.value;

    this.service.updateProfissional(professionalId, this.form.value).subscribe({
      next: () => {
        this.handleSuccess('Profissional atualizado com sucesso');
      },
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar profissional',
        }),
    });
  }

  abrirModalCadastro(): void {
    this.limparFormulario();
    this.displayDialog.set(true);
  }

  abrirGerenciamentoProfissional(profissional: IProfissionalResponse): void {
    this.profissionalSelecionado.set(profissional);
    this.displayDrawer.set(true);
  }

  editarProfissional(profissional: IProfissionalResponse): void {
    this.form.patchValue(profissional);
    this.displayDialog.set(true);
  }

  ativarProfissional(profissionalSelecionado: IProfissionalResponse) {
    profissionalSelecionado.ativo = true;
    this.form.patchValue(profissionalSelecionado);
    this.alterarProfissional();
  }

  confirmDesativarProfissional(profissionalId: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja desativar este profissional?',
      header: 'Atenção Necessária',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Desativar',
        severity: 'danger',
      },

      accept: () => {
        this.excluirProfissional(profissionalId);
      },
    });
  }

  private excluirProfissional(profissionalId: number): void {
    this.service.deleteProfissional(profissionalId).subscribe({
      next: () => {
        this.listarProfissionais();
        this.displayDrawer.set(false);
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Profissional excluído com sucesso',
        });
      },
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir profissional',
        }),
    });
  }

  private handleSuccess(message: string): void {
    this.listarProfissionais();
    this.toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
    this.limparFormulario();
    this.displayDialog.set(false);
  }

  private limparFormulario(): void {
    this.form.reset();
  }
}
