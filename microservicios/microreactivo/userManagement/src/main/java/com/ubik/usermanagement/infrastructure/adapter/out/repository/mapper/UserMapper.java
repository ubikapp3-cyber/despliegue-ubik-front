package com.ubik.usermanagement.infrastructure.adapter.out.repository.mapper;

import com.ubik.usermanagement.domain.model.User;
import com.ubik.usermanagement.infrastructure.adapter.out.repository.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toDomain(UserEntity entity) {
        return new User(
                entity.id(),
                entity.username(),
                entity.password(),
                entity.email(),
                entity.phoneNumber(),
                entity.createdAt(),
                entity.anonymous(),
                entity.roleId(),
                entity.resetToken(),
                entity.resetTokenExpiry()
        );
    }

    public UserEntity toEntity(User user) {
        return new UserEntity(
                user.id(),
                user.username(),
                user.password(),
                user.email(),
                user.phoneNumber(),
                user.createdAt(),
                user.anonymous(),
                user.roleId(),
                user.resetToken(),
                user.resetTokenExpiry()
        );
    }
}
