package com.ubik.usermanagement.infrastructure.adapter.out.repository.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("users")
public record UserEntity(

        @Id
        Long id,

        @Column("username")
        String username,

        @Column("password")
        String password,

        @Column("email")
        String email,

        @Column("phone_number")
        String phoneNumber,

        @Column("registration_time")
        LocalDateTime createdAt,

        @Column("anonymous")
        boolean anonymous,

        @Column("role_id")
        Integer roleId,

        @Column("reset_token")
        String resetToken,

        @Column("reset_token_expiry")
        LocalDateTime resetTokenExpiry
) {
}
