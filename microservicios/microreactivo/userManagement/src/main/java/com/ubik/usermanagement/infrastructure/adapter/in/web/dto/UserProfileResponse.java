package com.ubik.usermanagement.infrastructure.adapter.in.web.dto;

import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String username,
        String email,
        String phoneNumber,
        LocalDateTime createdAt,
        boolean anonymous,
        Integer roleId
) {
}
