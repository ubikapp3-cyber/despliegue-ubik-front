package com.ubik.usermanagement.infrastructure.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest (
        @Size(max = 20, message = "El número de teléfono no debe exceder 20 caracteres")
        String phoneNumber,

        Boolean anonymous,

        @Email(message = "Correo electrónico no válido")
        String email
)
{}
