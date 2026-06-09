package com.agendamento.fema.features.client.services;

import com.agendamento.fema.features.client.models.dtos.*;
import com.agendamento.fema.shared.entities.*;
import com.agendamento.fema.shared.enums.DiasSemana;
import com.agendamento.fema.shared.enums.StatusAgendamento;
import com.agendamento.fema.shared.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogoService {

    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    @Autowired
    private CargaHorariaRepository cargaHorariaRepository;
    @Autowired
    private TipoServicoRepository tipoServicoRepository;
    @Autowired
    private ProfissionalRepository profissionalRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    public HomeResponseDTO getHomeDados(Long clienteId) {
        List<AgendamentoResponseDTO> realizados = new ArrayList<>();
        List<EmpresaResumoDTO> empresasAgendadas = new ArrayList<>();

        if (clienteId != null) {
            realizados = agendamentoRepository.findByClienteIdOrderByDataDescHoraInicioDesc(clienteId).stream().map(a -> new AgendamentoResponseDTO(
                    a.getId(),
                    a.getObservacao(),
                    a.getStatus().name(),
                    a.getData(),
                    a.getHoraInicio(),
                    a.getHoraFim(),
                    a.getPrecoRegistrado()
            )).collect(Collectors.toList());

            empresasAgendadas = empresaRepository.findEmpresasOndeClienteAgendou(clienteId).stream().map(e -> new EmpresaResumoDTO(e.getId(), e.getNome(), e.getTelefone(), e.getEndereco())).collect(Collectors.toList());
        }

        var populares = empresaRepository.findEmpresasMaisPopulares();

        return new HomeResponseDTO(realizados, empresasAgendadas, populares);
    }

    public List<EmpresaResumoDTO> listarEmpresas() {
        return empresaRepository.findAll().stream().map(e -> new EmpresaResumoDTO(e.getId(), e.getNome(), e.getTelefone(), e.getEndereco())).collect(Collectors.toList());
    }

    public List<ProfissionalResumoDTO> listarProfissionaisPorEmpresa(Long empresaId) {
        return profissionalRepository.findByEmpresaIdAndAtivoTrue(empresaId, true).stream().map(p -> new ProfissionalResumoDTO(p.getId(), p.getNome(), p.isAtivo())).collect(Collectors.toList());
    }

    public List<LocalTime> calcularHorariosDisponiveis(Long profissionalId, LocalDate data) {
        DiasSemana diaSemanaEnum = converterParaDiaSemanaEnum(data.getDayOfWeek());
        List<CargaHoraria> grades = cargaHorariaRepository.findByProfissionalIdAndDiaSemana(profissionalId, diaSemanaEnum);

        List<LocalTime> horariosLivres = new ArrayList<>();
        if (grades.isEmpty()) return horariosLivres;

        List<Agendamento> agendamentosDoDia = agendamentoRepository.findByProfissionalIdAndDataAndStatusNot(profissionalId, data, StatusAgendamento.CANCELADO);

        for (CargaHoraria grade : grades) {
            LocalTime atual = grade.getHoraInicio();
            while (atual.plusMinutes(grade.getIntervaloAtendimento()).isBefore(grade.getHoraFim()) || atual.plusMinutes(grade.getIntervaloAtendimento()).equals(grade.getHoraFim())) {

                LocalTime inicioSlot = atual;
                LocalTime fimSlot = atual.plusMinutes(grade.getIntervaloAtendimento());

                boolean ocupado = agendamentosDoDia.stream().anyMatch(a -> (inicioSlot.isBefore(a.getHoraFim()) && fimSlot.isAfter(a.getHoraInicio())));

                if (!ocupado) {
                    horariosLivres.add(inicioSlot);
                }
                atual = fimSlot;
            }
        }
        return horariosLivres;
    }

    public List<TipoServicoResumoDTO> listarServicosPorProfissional(Long profissionalId) {
        return tipoServicoRepository.findByProfissionalIdAndAtivoTrue(profissionalId, true).stream().map(s -> new TipoServicoResumoDTO(s.getId(), s.getNome(), s.getDescricao(), s.getPreco())).collect(Collectors.toList());
    }

    public AgendamentoResponseDTO realizarAgendamento(AgendamentoDTO agendamentoDTO) {
        Cliente cliente = clienteRepository.findById(agendamentoDTO.clienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        Profissional profissional = profissionalRepository.findById(agendamentoDTO.profissionalId())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
        TipoServico tipoServico = tipoServicoRepository.findById(agendamentoDTO.servicoId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        LocalDate dataAgendamento = LocalDate.parse(agendamentoDTO.dataSelecionada());
        LocalTime horaInicio = LocalTime.parse(agendamentoDTO.horaInicio());

        DiasSemana diaSemanaEnum = converterParaDiaSemanaEnum(dataAgendamento.getDayOfWeek());
        CargaHoraria cargaHoraria = cargaHorariaRepository.findByProfissionalIdAndDiaSemana(profissional.getId(), diaSemanaEnum)
                .stream()
                .filter(ch -> !horaInicio.isBefore(ch.getHoraInicio()) && horaInicio.isBefore(ch.getHoraFim()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("O profissional não possui horário de atendimento configurado para este período."));

        LocalTime horaFim = horaInicio.plusMinutes(cargaHoraria.getIntervaloAtendimento());

        List<Agendamento> agendamentosDoDia = agendamentoRepository.findByProfissionalIdAndDataAndStatusNot(
                profissional.getId(), dataAgendamento, StatusAgendamento.CANCELADO);

        boolean ocupado = agendamentosDoDia.stream().anyMatch(a ->
                (horaInicio.isBefore(a.getHoraFim()) && horaFim.isAfter(a.getHoraInicio()))
        );

        if (ocupado) {
            throw new RuntimeException("Este horário já se encontra ocupado por outro cliente. Por favor, selecione outro.");
        }

        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);
        agendamento.setProfissional(profissional);
        agendamento.setTipoServico(tipoServico);
        agendamento.setCargaHoraria(cargaHoraria);
        agendamento.setData(dataAgendamento);
        agendamento.setHoraInicio(horaInicio);
        agendamento.setHoraFim(horaFim);
        agendamento.setStatus(StatusAgendamento.PENDENTE);
        agendamento.setObservacao(agendamentoDTO.observacao());
        agendamento.setPrecoRegistrado(tipoServico.getPreco().toString());

        agendamentoRepository.save(agendamento);

        return new AgendamentoResponseDTO(
                agendamento.getId(),
                agendamento.getObservacao(),
                agendamento.getStatus().name(),
                agendamento.getData(),
                agendamento.getHoraInicio(),
                agendamento.getHoraFim(),
                agendamento.getPrecoRegistrado()
        );
    }

    private DiasSemana converterParaDiaSemanaEnum(java.time.DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> DiasSemana.SEGUNDA;
            case TUESDAY -> DiasSemana.TERCA;
            case WEDNESDAY -> DiasSemana.QUARTA;
            case THURSDAY -> DiasSemana.QUINTA;
            case FRIDAY -> DiasSemana.SEXTA;
            case SATURDAY -> DiasSemana.SABADO;
            case SUNDAY -> DiasSemana.DOMINGO;
        };
    }
}