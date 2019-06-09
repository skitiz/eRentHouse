package com.aku.cogent.controllers;


import com.aku.cogent.components.EmailServiceImpl;
import com.aku.cogent.model.User;
import com.aku.cogent.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserAPI {

    @Autowired
    EmailServiceImpl emailService;

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/user")
    public ResponseEntity create(@Valid @RequestBody User user) {String text = "Your account has been activated \n Please set your password" +
//                 "on the link below: \n http:localhost:8080/user/password" +
//                 "/" + user.getId();
//        emailService.sendSimpleMessage(user.getEmail(),
//                "Account Activation",
//                text);
        userService.save(user);
//
        return ResponseEntity.ok("Your account has been created.");
    }

    @GetMapping("/user/type/{id}")
    public ResponseEntity findType(@PathVariable Long id) {
        User user = userService.findById(id).get();
        return ResponseEntity.ok(user.getType());
    }

    @PostMapping("/user/password/{id}")
    public ResponseEntity setPassword(@PathVariable Long id, @RequestBody
            String password) {
        User user = userService.findById(id).get();
        user.setPassword(password);
        return ResponseEntity.ok("Password successfuly changed");
    }

    @PostMapping("/user/type/{id}")
    public ResponseEntity changeType(@PathVariable Long id, @RequestBody int type) {
        User user = userService.findById(id).get();
        user.setType(type);
        userService.save(user);
        return ResponseEntity.ok(user.getType());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/user/{username}/and/{password}")
    public ResponseEntity<User> findByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {
        User user = userService.findUser(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        else
            return ResponseEntity.badRequest().build();

    }

    @PostMapping("/user/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @PathVariable
            User user) {
        if (!userService.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        if (!userService.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        userService.deleteById(id);

        return ResponseEntity.ok().build();
    }

}
