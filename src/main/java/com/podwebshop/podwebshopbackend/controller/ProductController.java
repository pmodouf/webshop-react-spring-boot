package com.podwebshop.podwebshopbackend.controller;

import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build(); // Du kan välja att returnera något specifikt eller bara en OK-status
    }

    // Om du beslutar att återaktivera getProduct-metoden
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        Optional<Product> productOpt = productService.getProductById(id);

        if (productOpt.isPresent()) {
            ProductDTO dto = productService.convertToDTO(productOpt.get());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/fetchFromExternalAPI")
    public ResponseEntity<?> fetchAndSaveProductsFromExternalAPI(@RequestParam String apiUrl) {
        try {
            List<Product> products = productService.fetchAndSaveProductsFromExternalAPI(apiUrl);
            return new ResponseEntity<>(products, HttpStatus.CREATED);
        } catch (Exception e) {
            // Logga felet eller skicka ett anpassat felmeddelande
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch and save products: " + e.getMessage());
        }
    }
}
