package com.example.vehicledashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vehicledashboard.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}
