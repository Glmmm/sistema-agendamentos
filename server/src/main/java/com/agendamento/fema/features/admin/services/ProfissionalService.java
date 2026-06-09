package com.agendamento.fema.features.admin.services;

import com.agendamento.fema.features.admin.models.dtos.*;
import com.agendamento.fema.shared.entities.*;
import com.agendamento.fema.shared.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfissionalService {

    private final ProfissionalRepository profissionalRepository;
    private final EmpresaRepository empresaRepository;
    private final CargaHorariaRepository cargaHorariaRepository;

    @Transactional(readOnly = true)
    public List<ProfissionalResponseDTO> listarPorEmpresa(Long empresaId) {
        return profissionalRepository.findByEmpresaId(empresaId).stream().map(this::converterParaResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProfissionalResponseDTO buscarPorId(Long empresaId, Long id) {
        Profissional profissional = profissionalRepository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: profissional não pertence a sua empresa.");
        }

        return converterParaResponseDTO(profissional);
    }

    @Transactional
    public ProfissionalResponseDTO cadastrar(Long empresaId, ProfissionalDTO dto) {
        Empresa empresa = empresaRepository.findById(empresaId).orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        Profissional profissional = new Profissional();
        profissional.setNome(dto.nome());
        profissional.setEmail(dto.email());
        profissional.setTelefone(dto.telefone());
        profissional.setAtivo(true);
        profissional.setEmpresa(empresa);

        Profissional profissionalSalvo = profissionalRepository.save(profissional);

        return converterParaResponseDTO(profissionalSalvo);
    }

    @Transactional
    public ProfissionalResponseDTO atualizar(Long empresaId, Long id, ProfissionalDTO dto) {
        Profissional profissional = profissionalRepository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não pode alterar este profissional.");
        }

        profissional.setNome(dto.nome());
        profissional.setEmail(dto.email());
        profissional.setTelefone(dto.telefone());
        profissional.setAtivo(dto.ativo());

        return converterParaResponseDTO(profissionalRepository.save(profissional));
    }

    @Transactional
    public void deletar(Long empresaId, Long id) {
        Profissional profissional = profissionalRepository.findById(id).orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não pode deletar este profissional.");
        }

        profissional.setAtivo(false);
        profissionalRepository.save(profissional);

    }

    private ProfissionalResponseDTO converterParaResponseDTO(Profissional p) {
        return new ProfissionalResponseDTO(p.getId(), p.getNome(), p.getEmail(), p.getTelefone(), p.isAtivo());
    }

}