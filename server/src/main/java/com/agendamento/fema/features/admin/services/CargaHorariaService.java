package com.agendamento.fema.features.admin.services;

import com.agendamento.fema.features.admin.models.dtos.CargaHorariaDTO;
import com.agendamento.fema.features.admin.models.dtos.CargaHorariaResponseDTO;
import com.agendamento.fema.shared.entities.CargaHoraria;
import com.agendamento.fema.shared.entities.Profissional;
import com.agendamento.fema.shared.enums.DiasSemana;
import com.agendamento.fema.shared.repositories.CargaHorariaRepository;
import com.agendamento.fema.shared.repositories.ProfissionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CargaHorariaService {

    private final CargaHorariaRepository cargaHorariaRepository;
    private final ProfissionalRepository profesionalRepository;

    @Transactional(readOnly = true)
    public List<CargaHorariaResponseDTO> listarTodas(Long empresaId) {
        return cargaHorariaRepository.findByEmpresaId(empresaId).stream().map(this::converterParaResponseDTO).collect(Collectors.toList());
    }

    public List<CargaHorariaResponseDTO> listarPorProfissional(Long profissionalId) {
        return cargaHorariaRepository.findByProfissionalId(profissionalId).stream().map(this::converterParaResponseDTO).collect((Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public CargaHorariaResponseDTO buscarPorId(Long empresaId, Long id) {
        CargaHoraria carga = cargaHorariaRepository.findById(id).orElseThrow(() -> new RuntimeException("Carga horária não encontrada"));
        if (!carga.getProfissional().getEmpresa().getId().equals(empresaId))
            throw new RuntimeException("Acesso negado: esta carga horária não pertence à sua empresa.");
        return converterParaResponseDTO(carga);
    }

    @Transactional
    public List<CargaHorariaResponseDTO> cadastrarEmLote(Long empresaId, CargaHorariaDTO dto) {
        Profissional profissional = profesionalRepository.findById(dto.profissionalId())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: este profissional não pertence à sua empresa.");
        }

        List<CargaHoraria> agendasExistentes = cargaHorariaRepository.findByProfissionalId(dto.profissionalId());

        Set<DiasSemana> diasJaCadastrados = agendasExistentes.stream()
                .map(CargaHoraria::getDiaSemana)
                .collect(Collectors.toSet());

        List<CargaHoraria> novasCargas = new ArrayList<>();

        for (DiasSemana dia : dto.diasSemana()) {
            if (diasJaCadastrados.contains(dia)) {
                throw new RuntimeException("O profissional já possui uma carga horária cadastrada para: " + dia);
            }

            CargaHoraria carga = new CargaHoraria();
            carga.setProfissional(profissional);
            carga.setDiaSemana(dia);
            carga.setHoraInicio(dto.horaInicio());
            carga.setHoraFim(dto.horaFim());
            carga.setIntervaloAtendimento(dto.intervaloAtendimento());

            novasCargas.add(carga);
        }

        List<CargaHoraria> cargasSalvas = cargaHorariaRepository.saveAll(novasCargas);

        return cargasSalvas.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<CargaHorariaResponseDTO> atualizarEmLote(Long empresaId, Long profissionalId, CargaHorariaDTO dto) {
        List<CargaHoraria> cargasAtuais = cargaHorariaRepository.findByProfissionalId(profissionalId);

        if (cargasAtuais.isEmpty()) {
            throw new RuntimeException("Nenhuma carga horária encontrada para o profissional informado.");
        }

        Profissional profissional = cargasAtuais.getFirst().getProfissional();
        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não pode alterar a carga horária deste profissional.");
        }

        Map<DiasSemana, CargaHoraria> mapaCargasAtuais = cargasAtuais.stream()
                .collect(Collectors.toMap(CargaHoraria::getDiaSemana, ch -> ch));

        List<CargaHoraria> cargasParaSalvar = new ArrayList<>();

        for (DiasSemana dia : dto.diasSemana()) {
            if (mapaCargasAtuais.containsKey(dia)) {
                CargaHoraria cargaExistente = mapaCargasAtuais.get(dia);
                cargaExistente.setHoraInicio(dto.horaInicio());
                cargaExistente.setHoraFim(dto.horaFim());
                cargaExistente.setIntervaloAtendimento(dto.intervaloAtendimento());
                cargasParaSalvar.add(cargaExistente);

                mapaCargasAtuais.remove(dia);
            } else {
                CargaHoraria novaCarga = new CargaHoraria();
                novaCarga.setProfissional(profissional);
                novaCarga.setDiaSemana(dia);
                novaCarga.setHoraInicio(dto.horaInicio());
                novaCarga.setHoraFim(dto.horaFim());
                novaCarga.setIntervaloAtendimento(dto.intervaloAtendimento());
                cargasParaSalvar.add(novaCarga);
            }
        }

        List<CargaHoraria> cargasSalvas = cargaHorariaRepository.saveAll(cargasParaSalvar);

        return cargasSalvas.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletar(Long empresaId, Long id) {
        CargaHoraria carga = cargaHorariaRepository.findById(id).orElseThrow(() -> new RuntimeException("Carga horária não encontrada"));
        if (!carga.getProfissional().getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não pode deletar esta carga horária.");
        }

        cargaHorariaRepository.delete(carga);
    }

    private CargaHorariaResponseDTO converterParaResponseDTO(CargaHoraria ch) {
        return new CargaHorariaResponseDTO(
                ch.getId(),
                ch.getProfissional().getId(),
                ch.getProfissional().getNome(),
                ch.getDiaSemana(),
                ch.getHoraInicio(),
                ch.getHoraFim(),
                ch.getIntervaloAtendimento()
        );
    }
}