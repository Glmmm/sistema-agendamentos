package com.agendamento.fema.features.admin.services;

import com.agendamento.fema.features.admin.models.dtos.CargaHorariaDTO;
import com.agendamento.fema.features.admin.models.dtos.CargaHorariaResponseDTO;
import com.agendamento.fema.shared.entities.CargaHoraria;
import com.agendamento.fema.shared.entities.Profissional;
import com.agendamento.fema.shared.repositories.CargaHorariaRepository;
import com.agendamento.fema.shared.repositories.ProfissionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    public CargaHorariaResponseDTO cadastrar(Long empresaId, CargaHorariaDTO dto) {
        Profissional profissional = profesionalRepository.findById(dto.profissionalId()).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));
        if (!profissional.getEmpresa().getId().equals(empresaId))
            throw new RuntimeException("Acesso negado: este profissional não pertence à sua empresa.");
        List<CargaHoraria> agendasExistentes = cargaHorariaRepository.findByProfissionalId(dto.profissionalId());
        boolean jaPossuiEsseDia = agendasExistentes.stream().anyMatch(ch -> ch.getDiaSemana().equals(dto.diaSemana()));
        if (jaPossuiEsseDia)
            throw new RuntimeException("O profissional já possui uma carga horária cadastrada para: " + dto.diaSemana());
        CargaHoraria carga = new CargaHoraria();
        carga.setProfissional(profissional);
        carga.setDiaSemana(dto.diaSemana());
        carga.setHoraInicio(dto.horaInicio());
        carga.setHoraFim(dto.horaFim());
        carga.setIntervaloAtendimento(dto.intervaloAtendimento());
        return converterParaResponseDTO(cargaHorariaRepository.save(carga));
    }

    @Transactional
    public CargaHorariaResponseDTO atualizar(Long empresaId, Long id, CargaHorariaDTO dto) {
        CargaHoraria carga = cargaHorariaRepository.findById(id).orElseThrow(() -> new RuntimeException("Carga horária não encontrada"));
        if (!carga.getProfissional().getEmpresa().getId().equals(empresaId))
            throw new RuntimeException("Acesso negado: você não pode alterar esta carga horária.");
        if (!carga.getDiaSemana().equals(dto.diaSemana())) {
            List<CargaHoraria> agendasExistentes = cargaHorariaRepository.findByProfissionalId(carga.getProfissional().getId());
            boolean jaPossuiEsseDia = agendasExistentes.stream().anyMatch(ch -> ch.getDiaSemana().equals(dto.diaSemana()));
            if (jaPossuiEsseDia)
                throw new RuntimeException("O profissional já possui uma agenda configurada para: " + dto.diaSemana());
            carga.setDiaSemana(dto.diaSemana());
        }
        carga.setHoraInicio(dto.horaInicio());
        carga.setHoraFim(dto.horaFim());
        carga.setIntervaloAtendimento(dto.intervaloAtendimento());
        return converterParaResponseDTO(cargaHorariaRepository.save(carga));
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
        return new CargaHorariaResponseDTO(ch.getId(), ch.getProfissional().getId(), ch.getProfissional().getNome(), ch.getDiaSemana(), ch.getHoraInicio(), ch.getHoraFim(), ch.getIntervaloAtendimento());
    }
}