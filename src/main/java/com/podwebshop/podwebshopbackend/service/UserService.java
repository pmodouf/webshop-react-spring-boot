package com.podwebshop.podwebshopbackend.service;

import com.podwebshop.podwebshopbackend.model.User;
import com.podwebshop.podwebshopbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Hämta alla användare
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Hämta en specifik användare med ID
    public User findUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // Skapa en ny användare
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hasha lösenordet
        return userRepository.save(user);
    }

    // Uppdatera en befintlig användare
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Hasha det nya lösenordet
            user.setEmail(userDetails.getEmail());
            userRepository.save(user);
        }
        return user;
    }
    public Optional<User> authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }



    // Radera en användare
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
