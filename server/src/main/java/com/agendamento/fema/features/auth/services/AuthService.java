package com.agendamento.fema.features.auth.services;

import com.agendamento.fema.features.auth.models.dtos.ClienteDTO;
import com.agendamento.fema.features.auth.models.dtos.EmpresaDTO;
import com.agendamento.fema.features.auth.models.dtos.UserInfoResponseDTO;
import com.agendamento.fema.shared.entities.Cliente;
import com.agendamento.fema.shared.entities.Empresa;
import com.agendamento.fema.shared.entities.Usuario;
import com.agendamento.fema.shared.repositories.ClienteRepository;
import com.agendamento.fema.shared.repositories.EmpresaRepository;
import com.agendamento.fema.shared.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(username);
    }

        public UserInfoResponseDTO obterInformacoesDoUsuario(Usuario usuario) {
            String roleName = usuario.getRole().getName().toString();

            if (roleName.equals("ROLE_CLIENTE")) {
                Cliente cliente = clienteRepository.findByUsuario(usuario)
                        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

                ClienteDTO clienteDTO = new ClienteDTO(cliente.getId(), cliente.getNome(), cliente.getTelefone(), usuario.getLogin());
                return new UserInfoResponseDTO("CLIENTE", clienteDTO);
            }

            if (roleName.equals("ROLE_EMPRESA") || roleName.equals("ROLE_ADMIN")) {
                Empresa empresa = empresaRepository.findByUsuario(usuario)
                        .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

                EmpresaDTO empresaDTO = new EmpresaDTO(empresa.getId(), empresa.getNome(), empresa.getCnpj(), empresa.getTelefone(), empresa.getEndereco(), usuario.getLogin());
                return new UserInfoResponseDTO("EMPRESA", empresaDTO);
            }

            throw new IllegalArgumentException("Tipo de usuário inválido");
        }
    }
