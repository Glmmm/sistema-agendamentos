import { Component, inject, OnInit, signal, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PopoverModule } from 'primeng/popover';

import { cargaHorariaForms } from './models/forms/carga-horaria.forms';
import { CargasHorariasService } from '../../../../core/services/admin/cargas-horarias.service';
import { ICargaHorariaResponse } from '../../models/cargas.horarias-response.model';
import { DIAS_SEMANA_OPTIONS } from './models/dias-semana-options';
import { MultiSelectModule } from 'primeng/multiselect';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.html',
  imports: [
    TitleCasePipe,
    CardModule,
    DialogModule,
    ButtonModule,
    PopoverModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
  ],
})
export class CargaHorariaComponent implements OnInit {
  private service = inject(CargasHorariasService);
  private toast = inject(MessageService);

  profissionalId = input.required<number>();

  displayDialog = signal(false);
  cargasHorarias = signal<ICargaHorariaResponse[]>([]);
  form = cargaHorariaForms();

  get isEditing(): boolean {
    return !!this.form.get('id')?.value;
  }

  ngOnInit(): void {
    this.listarCargasHorarias();
  }

  listarCargasHorarias(): void {
    this.service.getCargasHorariasByProfissional(this.profissionalId()).subscribe({
      next: (response) => this.cargasHorarias.set(response),
      error: () =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao listar a carga horária do profissional',
        }),
    });
  }

  salvarCargaHoraria(): void {
    if (this.form.invalid) {
      this.toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente',
      });
      return;
    }

    if (this.isEditing) {
      this.alterarCargaHoraria();
    } else {
      this.cadastrarCargaHoraria();
    }
  }

  private cadastrarCargaHoraria(): void {
    this.service.createCargaHoraria(this.form.value).subscribe({
      next: () => this.handleSuccess('Carga horária cadastrada com sucesso'),
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao cadastrar carga horária',
        }),
    });
  }

  private alterarCargaHoraria(): void {
    const id = this.form.get('profissionalId')?.value;

    this.service.updateCargaHoraria(id!, this.form.value).subscribe({
      next: () => this.handleSuccess('Carga horária atualizada com sucesso'),
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao atualizar carga horária',
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

  editarCargaHoraria(carga: ICargaHorariaResponse): void {
    this.form.patchValue({
      id: carga.id,
      diasSemana: [carga.diaSemana],
      horaInicio: carga.horaInicio.substring(0, 5),
      horaFim: carga.horaFim.substring(0, 5),
      intervaloAtendimento: carga.intervaloAtendimento,
      profissionalId: this.profissionalId(),
    });
    this.displayDialog.set(true);
  }

  excluirCargaHoraria(id: number): void {
    this.service.deleteCargaHoraria(id).subscribe({
      next: () => {
        this.listarCargasHorarias();
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Carga horária excluída com sucesso',
        });
      },
      error: (err) =>
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error || 'Erro ao excluir carga horária',
        }),
    });
  }

  diasDaSemanaOpcoes = DIAS_SEMANA_OPTIONS;

  get diasDisponiveis() {
    const diasCadastrados = this.cargasHorarias().map((c) => c.diaSemana);
    const diaSendoEditado = this.form.get('diaSemana')?.value;

    return this.diasDaSemanaOpcoes.filter((opcao) => {
      return !diasCadastrados.includes(opcao.value) || opcao.value === diaSendoEditado;
    });
  }

  private handleSuccess(message: string): void {
    this.listarCargasHorarias();
    this.toast.add({ severity: 'success', summary: 'Sucesso', detail: message });
    this.form.reset();
    this.displayDialog.set(false);
  }
}
