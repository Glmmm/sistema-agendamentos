package com.agendamento.fema.features.auth.controllers;

import com.agendamento.fema.core.security.TokenService;
import com.agendamento.fema.features.auth.models.dtos.LoginDTO;
import com.agendamento.fema.features.auth.models.dtos.RegisterDTO;
import com.agendamento.fema.features.auth.repositories.RoleRepository;
import com.agendamento.fema.features.auth.repositories.UsuarioRepository;
import com.agendamento.fema.shared.models.entities.Role;
import com.agendamento.fema.shared.models.entities.Usuario;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO form){
        var user = new UsernamePasswordAuthenticationToken(form.login(), form.password());
        var auth = authenticationManager.authenticate(user);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        return ResponseEntity.ok(token);
    }

 @PostMapping("/register")
public ResponseEntity register(@RequestBody @Valid RegisterDTO form) {
    if (usuarioRepository.findByLogin(form.login()) != null) {
        return ResponseEntity.badRequest().build();
    }
    
    String encodedPass = new BCryptPasswordEncoder().encode(form.password());
    Role role = roleRepository.findById(form.roleId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cargo não encontrado"));
            
    Usuario usuario = new Usuario(form.login(), encodedPass, role);
    usuarioRepository.save(usuario);

    return ResponseEntity.ok(usuario);
}
}
