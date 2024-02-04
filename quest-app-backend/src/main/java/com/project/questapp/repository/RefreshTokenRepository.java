package com.project.questapp.repository;

import com.project.questapp.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Ref;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByUserId(Long userId);
}
