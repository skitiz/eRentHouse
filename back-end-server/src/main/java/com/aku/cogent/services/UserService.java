package com.aku.cogent.services;

import com.aku.cogent.model.RealEstate;
import com.aku.cogent.model.User;
import com.aku.cogent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User findUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
