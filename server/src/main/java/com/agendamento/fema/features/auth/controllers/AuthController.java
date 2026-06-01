package com.agendamento.fema.features.auth.controllers;

import com.agendamento.fema.core.security.TokenService;
import com.agendamento.fema.features.auth.models.dtos.*;
import com.agendamento.fema.features.auth.services.AuthService;
import com.agendamento.fema.shared.repositories.RoleRepository;
import com.agendamento.fema.shared.repositories.UsuarioRepository;
import com.agendamento.fema.shared.repositories.ClienteRepository;
import com.agendamento.fema.shared.repositories.EmpresaRepository;
import com.agendamento.fema.shared.entities.Cliente;
import com.agendamento.fema.shared.entities.Empresa;
import com.agendamento.fema.shared.entities.Role;
import com.agendamento.fema.shared.entities.Usuario;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RequestMapping("/auth")
@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginDTO form) {
        var credentials = new UsernamePasswordAuthenticationToken(form.login(), form.password());
        var auth = authenticationManager.authenticate(credentials);

        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.generateToken(usuario);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO form) {
        if (usuarioRepository.findByLogin(form.email()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado.");
        }

        Role role = roleRepository.findById(form.roleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cargo não encontrado"));

        String encodedPass = new BCryptPasswordEncoder().encode(form.password());

        Usuario usuario = new Usuario(form.email(), encodedPass, role);
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        if (form instanceof RegisterProviderDTO providerForm) {
            Empresa empresa = new Empresa(usuarioSalvo, providerForm);
            empresaRepository.save(empresa);
        } else if (form instanceof RegisterClientDTO clientForm) {
            Cliente cliente = new Cliente(usuarioSalvo, clientForm);
            clienteRepository.save(cliente);
            return ResponseEntity.ok(usuarioSalvo);
        }

        return ResponseEntity.ok(usuarioSalvo);
    }


    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal Usuario usuarioLogado) {
        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }

        UserInfoResponseDTO response = authService.obterInformacoesDoUsuario(usuarioLogado);
        return ResponseEntity.ok(response);
    }

}
