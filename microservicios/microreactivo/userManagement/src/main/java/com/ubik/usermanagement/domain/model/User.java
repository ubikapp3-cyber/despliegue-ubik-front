package com.ubik.usermanagement.domain.model;

import java.time.LocalDateTime;

public record User(
        Long id,
        String username,
        String password,
        String email,
        String phoneNumber,
        LocalDateTime createdAt,
        boolean anonymous,
        Integer roleId,
        String resetToken,
        LocalDateTime resetTokenExpiry
) {
}

