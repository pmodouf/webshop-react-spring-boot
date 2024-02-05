package com.podwebshop.podwebshopbackend.controller;

import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;


    @Autowired
    public ProductController(ProductService productService){

        this.productService = productService;
    }
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){

        return ResponseEntity.ok(productService.getAllProducts());
    }
    /*@GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id); // Antag att detta hämtar din produkt
        ProductDTO dto = productService.convertToDTO(product);
        return ResponseEntity.ok(dto);
    } */
    @PostMapping("/add")
    public ResponseEntity<Object> addProduct(@RequestBody Product product){
        return ResponseEntity.ok(productService.addProduct(product));
    }
}
