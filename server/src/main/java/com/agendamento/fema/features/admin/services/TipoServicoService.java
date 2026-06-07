package com.agendamento.fema.features.admin.services;


import com.agendamento.fema.features.admin.models.dtos.TipoServicoDTO;
import com.agendamento.fema.features.admin.models.dtos.TipoServicoResponseDTO;
import com.agendamento.fema.shared.entities.Profissional;
import com.agendamento.fema.shared.entities.TipoServico;
import com.agendamento.fema.shared.repositories.ProfissionalRepository;
import com.agendamento.fema.shared.repositories.TipoServicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TipoServicoService {
    private final TipoServicoRepository tipoServicoRepository;
    private final ProfissionalRepository profissionalRepository;

    @Transactional(readOnly = true)
    public List<TipoServicoResponseDTO> listarPorProfissional(Long profissionalId) {
        return tipoServicoRepository.findByProfissionalId(profissionalId)
                .stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TipoServicoResponseDTO buscarPorId(Long empresaId, Long id) {
        TipoServico servico = tipoServicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        if (!servico.getProfissional().getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: este serviço pertence a um profissional de outra empresa.");
        }

        return converterParaResponseDTO(servico);
    }

    @Transactional
    public TipoServicoResponseDTO cadastrar(Long empresaId, TipoServicoDTO dto) {
        Profissional profissional = profissionalRepository.findById(dto.profissionalId())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (!profissional.getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: este profissional não pertence à sua empresa.");
        }

        TipoServico servico = new TipoServico();
        servico.setNome(dto.nome());
        servico.setDescricao(dto.descricao());
        servico.setPreco(dto.preco());
        servico.setProfissional(profissional);

        TipoServico salvo = tipoServicoRepository.save(servico);
        return converterParaResponseDTO(salvo);
    }

    @Transactional
    public TipoServicoResponseDTO atualizar(Long empresaId, Long id, TipoServicoDTO dto) {
        TipoServico servico = tipoServicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        if (!servico.getProfissional().getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não tem permissão para alterar este serviço.");
        }

        servico.setNome(dto.nome());
        servico.setDescricao(dto.descricao());
        servico.setPreco(dto.preco());

        if (dto.profissionalId() != null) {
            Profissional novoProfissional = profissionalRepository.findById(dto.profissionalId())
                    .orElseThrow(() -> new RuntimeException("Novo profissional não encontrado"));

            if (!novoProfissional.getEmpresa().getId().equals(empresaId)) {
                throw new RuntimeException("Acesso negado: o novo profissional não pertence à sua empresa.");
            }
            servico.setProfissional(novoProfissional);
        }

        TipoServico atualizado = tipoServicoRepository.save(servico);
        return converterParaResponseDTO(atualizado);
    }

    @Transactional
    public void deletar(Long empresaId, Long id) {
        TipoServico servico = tipoServicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        if (!servico.getProfissional().getEmpresa().getId().equals(empresaId)) {
            throw new RuntimeException("Acesso negado: você não pode deletar este serviço.");
        }

        servico.setAtivo(false);
        tipoServicoRepository.save(servico);
    }

    private TipoServicoResponseDTO converterParaResponseDTO(TipoServico s) {
        return new TipoServicoResponseDTO(
                s.getId(),
                s.getNome(),
                s.getDescricao(),
                s.getPreco(),
                s.getAtivo()
        );
    }
}