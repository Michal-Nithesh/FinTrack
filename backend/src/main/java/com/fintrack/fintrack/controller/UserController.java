package com.fintrack.fintrack.controller;

import com.fintrack.fintrack.dto.PasswordChangeRequest;
import com.fintrack.fintrack.dto.ProfileUpdateRequest;
import com.fintrack.fintrack.entity.User;
import com.fintrack.fintrack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return userService.getProfile(email);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestParam String email, @RequestBody ProfileUpdateRequest request) {
        return userService.updateProfile(email, request);
    }

    @PutMapping("/password")
    public void changePassword(@RequestParam String email, @RequestBody PasswordChangeRequest request) {
        userService.changePassword(email, request);
    }
}