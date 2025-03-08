package com.fintrack.fintrack.controller;

import com.fintrack.fintrack.dto.AuthResponse;
import com.fintrack.fintrack.dto.LoginRequest;
import com.fintrack.fintrack.dto.SignupRequest;
import com.fintrack.fintrack.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody SignupRequest request) {
        AuthResponse response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.authenticateUser(request);
        return ResponseEntity.ok(response);
    }
}
