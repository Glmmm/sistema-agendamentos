import { Component, inject, OnInit, signal, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';

import { servicosTableColumns } from './models/servicos.table';
import { TiposServicosService } from '../../../../core/services/admin/tipos-servicos.service';
import { ITipoServicoResponse } from '../../models/tipo-servicos-response.model';
import { servicosForms } from './models/forms/servicos.forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.html',
  imports: [
    CurrencyPipe,
    CardModule,
    DialogModule,
    TableModule,
    ButtonModule,
    PopoverModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
  ],
})
export class ServicosComponent implements OnInit {
  private service = inject(TiposServicosService);
  private toast = inject(MessageService);

  profissionalId = input.required<number>();

  displayDialog = signal(false);
  servicos = signal<ITipoServicoResponse[]>([]);

  columns = servicosTableColumns;
  form = servicosForms();

  get isEditing(): boolean {
    return !!this.form.get('id')?.value;
  }

  ngOnInit(): void {
    this.listarServicos();
  }

  listarServicos(): void {
    this.service.getServicosByProfissional(this.profissionalId()).subscribe({
      next: (response) => this.servicos.set(response),
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar serviços do profissional',
        }),
    });
  }

  salvarServico(): void {
    if (this.form.invalid) {
      this.toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente',
      });
      return;
    }

    if (this.isEditing) {
      this.alterarServico();
    } else {
      this.cadastrarServico();
    }
  }

  private cadastrarServico(): void {
    this.service.createServico(this.form.value).subscribe({
      next: () => this.handleSuccess('Serviço cadastrado com sucesso'),
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao cadastrar serviço',
        }),
    });
  }

  private alterarServico(): void {
    const id = this.form.get('id')?.value;

    this.service.updateServico(id!, this.form.value).subscribe({
      next: () => this.handleSuccess('Serviço atualizado com sucesso'),
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao atualizar serviço',
        }),
    });
  }

  abrirModalCadastro(): void {
    this.form.reset();
    this.form.patchValue({
      profissionalId: this.profissionalId(),
    });
    this.displayDialog.set(true);
  }

  editarServico(servico: ITipoServicoResponse): void {
    this.form.patchValue({
      id: servico.id,
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      profissionalId: this.profissionalId(),
    });
    this.displayDialog.set(true);
  }

  excluirServico(id: number): void {
    this.service.deleteServico(id).subscribe({
      next: () => {
        this.listarServicos();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Serviço excluído com sucesso',
        });
      },
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao excluir serviço',
        }),
    });
  }

  private handleSuccess(message: string): void {
    this.listarServicos();
    this.toast.add({ severity: 'success', summary: 'Sucesso', detail: message });
    this.form.reset();
    this.displayDialog.set(false);
  }
}
