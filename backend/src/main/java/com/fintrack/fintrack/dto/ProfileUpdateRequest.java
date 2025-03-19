package com.fintrack.fintrack.dto;

import com.fintrack.fintrack.entity.Role;

public class ProfileUpdateRequest {
    private String name;
    private String email;
    private Role role; // Change from String to Role

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}