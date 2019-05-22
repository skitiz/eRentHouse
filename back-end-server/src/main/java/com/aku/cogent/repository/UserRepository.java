package com.aku.cogent.repository;

import com.aku.cogent.model.RealEstate;
import com.aku.cogent.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsernameAndPassword(String user, String password);
}
