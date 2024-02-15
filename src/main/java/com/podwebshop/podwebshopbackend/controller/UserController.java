package com.podwebshop.podwebshopbackend.controller;



import com.podwebshop.podwebshopbackend.dto.LoginRequest;
import com.podwebshop.podwebshopbackend.model.AuthenticationResponse;
import com.podwebshop.podwebshopbackend.model.User;
import com.podwebshop.podwebshopbackend.service.UserService;
import com.podwebshop.podwebshopbackend.utilz.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    // Hämta alla användare
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    // Hämta en specifik användare med ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    // Skapa en ny användare
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Uppdatera en befintlig användare
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // Radera en användare
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> authenticatedUser = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (authenticatedUser.isPresent()) {
            String token = jwtUtil.generateToken(authenticatedUser.get().getEmail());
            AuthenticationResponse response = new AuthenticationResponse(token);
            return ResponseEntity.ok(response); // Returnerar ResponseEntity med AuthenticationResponse
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse("Invalid email or password"));
        }
    }


}


