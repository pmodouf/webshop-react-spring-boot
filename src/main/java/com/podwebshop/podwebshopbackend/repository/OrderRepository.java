package com.podwebshop.podwebshopbackend.repository;

import com.podwebshop.podwebshopbackend.model.Order;
import com.podwebshop.podwebshopbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserEmail(String email); // Ändra till att använda email

    @Query("SELECT o FROM Order o WHERE o.id = :id AND o.user.email = :email")
    Optional<Order> findByIdAndUserEmail(@Param("id") Long id, @Param("email") String email); // Använd email här
}

