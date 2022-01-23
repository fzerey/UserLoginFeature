package com.fzerey.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findAll(Pageable page);

    Page<User> findByEnabledIsTrue(Pageable page);

    User findByUsername(String username);


    User findByEmail(String email);
}
