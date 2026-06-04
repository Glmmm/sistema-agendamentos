import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProfissionaisService } from '../../../../core/services/admin/profissionais.service';
import { AuthHelper } from '../../../auth/auth.helper';
import { IProfissionalResponse } from '../../models/profissionais-response.model';
import { profissionaisTableColumns } from './models/profissionais.table';
import { InputTextModule } from 'primeng/inputtext';
import { profissionaisForms } from './models/profissionais.forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { PopoverModule } from 'primeng/popover';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.html',
  styleUrls: [],

  imports: [
    CardModule,
    DialogModule,
    TableModule,
    ButtonModule,
    PopoverModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
  ],
})
export class ProfissionaisComponent implements OnInit {
  private service = inject(ProfissionaisService);
  private auth = inject(AuthHelper);
  private toast = inject(MessageService);

  displayDialog = signal(false);
  columns = profissionaisTableColumns;
  profissionais = signal<IProfissionalResponse[]>([]);
  form = profissionaisForms();

  ngOnInit() {
    this.listarProfissionais();
  }

  listarProfissionais() {
    let id = this.auth.store.user()!.data.id;
    this.service.getProfissionalByEmpresa(id).subscribe({
      next: (response) => {
        this.profissionais.set(response);
      },
      error: () => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar profissionais',
        });
      },
    });
  }

  cadastrarProfissional() {
    if (this.form.invalid) {
      this.toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente',
      });
      return;
    }

    this.service.createProfissional(this.form.value).subscribe({
      next: () => {
        this.listarProfissionais();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Profissional cadastrado com sucesso',
        });
        this.form.reset();
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar profissional',
        });
      },
    });
  }

  alterarProfissional(profissionalId: number) {
    this.service.updateProfissional(profissionalId, this.form.value).subscribe({
      next: () => {
        this.listarProfissionais();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Profissional atualizado com sucesso',
        });
        this.form.reset();
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar profissional',
        });
      },
    });
  }

  visualizarServicos(profissionalId: number) {
    // Lógica para visualizar os serviços do profissional
  }

  visualizarHorarios(profissionalId: number) {
    // Lógica para visualizar os horários do profissional
  }

  editarProfissional(profissional: IProfissionalResponse) {
    this.form.patchValue(profissional);
    this.displayDialog.set(true);
  }

  excluirProfissional(profissionalId: number) {
    this.service.deleteProfissional(profissionalId).subscribe({
      next: () => {
        this.listarProfissionais();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Profissional excluído com sucesso',
        });
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir profissional',
        });
      },
    });
  }
}
