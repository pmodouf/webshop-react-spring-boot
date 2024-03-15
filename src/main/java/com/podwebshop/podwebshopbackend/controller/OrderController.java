package com.podwebshop.podwebshopbackend.controller;

import com.podwebshop.podwebshopbackend.dto.OrderDto;
import com.podwebshop.podwebshopbackend.model.Order;
import com.podwebshop.podwebshopbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Skapa en ny order
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto newOrder = orderService.createOrder(orderDto);
        return ResponseEntity.ok(newOrder);
    }

    // Hämta alla ordrar för den inloggade användaren
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Order>> getAllOrdersForCurrentUser() {
        List<Order> orders = orderService.getAllOrdersForCurrentUser();
        return ResponseEntity.ok(orders);
    }

    // Hämta en specifik order för den inloggade användaren baserat på order-ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Order> getOrderByIdAndCurrentUser(@PathVariable Long id) {
        return orderService.getOrderByIdAndCurrentUser(id)
                .map(order -> ResponseEntity.ok(order))
                .orElse(ResponseEntity.notFound().build());
    }

    // Radera en specifik order för den inloggade användaren baserat på order-ID
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }
}
