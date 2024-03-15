package com.podwebshop.podwebshopbackend.service;

import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.repository.ProductRepository;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final RestTemplate restTemplate;
    @Autowired
    public ProductService(ProductRepository productRepository, RestTemplate restTemplate) {

        this.productRepository = productRepository;
        this.restTemplate = restTemplate;
    }
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    public List<Product> getAllProducts(){

        return productRepository.findAll();
    }


    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setProductName(productDetails.getProductName());
                    product.setPrice(productDetails.getPrice());
                    // Kopiera över andra relevanta fält här
                    return productRepository.save(product);
                }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setProductName(product.getProductName());
        productDTO.setPrice(product.getPrice());

        log.info("Konverterar Product till ProductDTO - ID: {}, Namn: {}, Pris: {}",
                productDTO.getId(), productDTO.getProductName(), productDTO.getPrice());


        return productDTO;
    }
    public List<Product> fetchAndSaveProductsFromExternalAPI(String apiUrl) {
        Product[] products = restTemplate.getForObject(apiUrl, Product[].class);
        if (products != null) {
            for (Product product : products) {
                productRepository.save(product); // Spara varje produkt i databasen
            }
            return Arrays.asList(products); // Returnera listan med produkter
        }
        return Collections.emptyList(); // Returnera en tom lista om inga produkter hämtades
    }

}
