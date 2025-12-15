package com.ubik.usermanagement.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @NotBlank String username,
        @NotBlank String password,
        @Email @NotBlank String email,
        @NotNull boolean anonymous,
        @NotNull(message = "roleId is required")
        @Min(value = 1, message = "roleId must be a positive number")
        Integer roleId
) {
}
