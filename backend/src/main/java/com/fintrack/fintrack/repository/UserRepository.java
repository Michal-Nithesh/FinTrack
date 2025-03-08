package com.fintrack.fintrack.repository;

import com.fintrack.fintrack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Ensure this method returns an Optional<User>
    Optional<User> findByEmail(String email);
}