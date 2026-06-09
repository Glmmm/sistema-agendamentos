import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoService } from '../../../../core/services/client/catalogo.service';
import { IEmpresaResumo } from '../../models/empresa-resumo.model';
import { IProfissionalResumo } from '../../models/profissional-resumo.model';
import { ITipoServicoResumo } from '../../models/tipo-servico-resumo.model';
import { AuthStore } from '../../../auth/auth.store';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { agendamentoForms } from '../../models/forms/agendamento.forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    ButtonModule,
    StepperModule,
    DatePickerModule,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: `./agendamento.html`,
})
export class AgendamentoComponent implements OnInit {
  private toast = inject(MessageService);
  private service = inject(CatalogoService);
  public store = inject(AuthStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  hoje = new Date();

  activeStep = signal<number>(1);
  empresas = signal<IEmpresaResumo[]>([]);
  profissionais = signal<IProfissionalResumo[]>([]);
  horarios = signal<string[]>([]);
  servicos = signal<ITipoServicoResumo[]>([]);

  form = agendamentoForms(this.store.user()?.data.id!);

  ngOnInit(): void {
    this.service.getEmpresas().subscribe((res) => this.empresas.set(res));
  }

  selecionarEmpresa(id: number) {
    this.form.patchValue({ empresaId: id });

    this.service.getProfissionaisPorEmpresa(id).subscribe((res) => {
      this.profissionais.set(res);
      this.activeStep.set(2);
    });
  }

  selecionarProfissional(id: number): void {
    this.form.patchValue({ profissionalId: id });
    this.activeStep.set(3);
  }

  onDataSelecionada(data: Date | null): void {
    if (!data) return;

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const dataString = `${ano}-${mes}-${dia}`;

    this.form.patchValue({ dataSelecionada: dataString });

    const profId = this.form.get('profissionalId')?.value;
    if (profId) {
      this.service.getHorariosDisponiveis(profId, dataString).subscribe((res) => {
        this.horarios.set(res);
      });
    }
  }

  selecionarHorario(hora: string): void {
    this.form.patchValue({ horaInicio: hora });
    const profId = this.form.get('profissionalId')?.value;

    if (profId) {
      this.service.getServicosPorProfissional(profId).subscribe((res) => {
        this.servicos.set(res);
        this.activeStep.set(4);
      });
    }
  }

  finalizarAgendamento(servico: ITipoServicoResumo): void {
    this.form.patchValue({ servicoId: servico.id, precoRegistrado: servico.preco });
    if (this.form.invalid) {
      return;
    }
    this.service.realizarAgendamento(this.form.value).subscribe({
      next: (value) => {
        this.toast.add({
          severity: 'success',
          summary: 'Agendamento realizado',
          detail: 'agendamento realizado com sucesso',
        });
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao realizar agendamento',
        });
      },
    });
    console.log('Payload Final:', this.form.value);
  }
}
