package com.podwebshop.podwebshopbackend.service;


import com.podwebshop.podwebshopbackend.model.Order;
import com.podwebshop.podwebshopbackend.model.User;
import com.podwebshop.podwebshopbackend.repository.OrderRepository;
import com.podwebshop.podwebshopbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    public Order createOrder(Order order) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Eftersom vi använder email som 'username'
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Användaren hittades inte"));
        order.setUser(user);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrdersForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderRepository.findAllByUserEmail(email); // Uppdatera denna metod i ditt repository
    }

    public Optional<Order> getOrderByIdAndCurrentUser(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return orderRepository.findByIdAndUserEmail(id, email); // Uppdatera denna metod i ditt repository
    }

    public void deleteOrder(Long id) {
        Optional<Order> orderOptional = getOrderByIdAndCurrentUser(id);
        orderOptional.ifPresent(order -> orderRepository.deleteById(id));
    }
}
