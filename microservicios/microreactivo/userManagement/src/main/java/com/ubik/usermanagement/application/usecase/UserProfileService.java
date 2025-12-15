package com.ubik.usermanagement.application.usecase;

import com.ubik.usermanagement.application.port.in.UserProfileUseCase;
import com.ubik.usermanagement.application.port.out.UserRepositoryPort;
import com.ubik.usermanagement.domain.model.User;
import com.ubik.usermanagement.infrastructure.adapter.in.web.dto.UpdateUserRequest;
import com.ubik.usermanagement.infrastructure.adapter.in.web.dto.UserProfileResponse;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserProfileService implements UserProfileUseCase {

    private final UserRepositoryPort userRepository;

    public UserProfileService(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Mono<UserProfileResponse> getUserProfile(String username) {
        return userRepository.findByUsername(username)
                .map(this::toResponse);
    }

    @Override
    public Mono<UserProfileResponse> updateUserProfile(String username, UpdateUserRequest request) {
        return userRepository.findByUsername(username)
                .flatMap(existingUser -> {
                    User updatedUser = new User(
                            existingUser.id(),
                            existingUser.username(),
                            existingUser.password(),
                            request.email() != null ? request.email() : existingUser.email(),
                            request.phoneNumber() != null ? request.phoneNumber() : existingUser.phoneNumber(),
                            existingUser.createdAt() != null ? existingUser.createdAt() : LocalDateTime.now(),
                            request.anonymous() != null ? request.anonymous() : existingUser.anonymous(),
                            existingUser.roleId(),
                            existingUser.resetToken(),
                            existingUser.resetTokenExpiry()
                    );

                    return userRepository.save(updatedUser)
                            .map(this::toResponse);
                });
    }
    private UserProfileResponse toResponse(User user) {
        return new UserProfileResponse(
                user.id(),
                user.username(),
                user.email(),
                user.phoneNumber(),
                user.createdAt(),
                user.anonymous(),
                user.roleId()
        );
    }
}
