package com.podwebshop.podwebshopbackend.repository;

import com.podwebshop.podwebshopbackend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Cart, Long> {
}
