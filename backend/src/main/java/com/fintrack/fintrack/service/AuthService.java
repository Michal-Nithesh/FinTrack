package com.fintrack.fintrack.service;

import com.fintrack.fintrack.dto.AuthResponse;
import com.fintrack.fintrack.dto.LoginRequest;
import com.fintrack.fintrack.dto.SignupRequest;
import com.fintrack.fintrack.entity.Role;
import com.fintrack.fintrack.entity.User;
import com.fintrack.fintrack.repository.UserRepository;
import com.fintrack.fintrack.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registerUser(SignupRequest request) {
        // Check if the user already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        // Create a new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Convert the role string to an enum
        try {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role provided");
        }

        // Save the user and generate a token
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token,existingUser.get().getEmail());
    }

    public AuthResponse authenticateUser(LoginRequest request) {
        // Find the user by email
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found"));

        // Verify the password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate a token
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token,optionalUser.get().getEmail());
    }
}