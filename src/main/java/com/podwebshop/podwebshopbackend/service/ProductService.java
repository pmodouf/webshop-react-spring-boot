package com.podwebshop.podwebshopbackend.service;

import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.repository.ProductRepository;

import jakarta.annotation.PostConstruct;
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
        productDTO.setProductName(product.getProductName());
        productDTO.setPrice(product.getPrice());
        // Kopiera över andra relevanta fält
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



   /* public ProductDTO convertToDTO2(Product product){
        ProductDTO productDTO = new ProductDTO();
       productDTO.setProductName(product.getProductName());
       productDTO.setPrice(product.getPrice());
        return productDTO;
    }
    @PostConstruct
    private void initializeProducts() {
        Product product1 = new Product();
        product1.setProductName("Laptop");
        product1.setPrice(1200.0);
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setProductName("Airpods");
        product2.setPrice(100.0);
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setProductName("Ipad Pro");
        product3.setPrice(800.0);
        productRepository.save(product3);

        Product product4 = new Product();
        product4.setProductName("Iphone");
        product4.setPrice(1200.0);
        productRepository.save(product4);

        Product product5 = new Product();
        product5.setProductName("HeadPhones");
        product5.setPrice(300.0);
        productRepository.save(product5);

        Product product6 = new Product();
        product6.setProductName("Lamp");
        product6.setPrice(50.0);
        productRepository.save(product6);

        Product product7 = new Product();
        product7.setProductName("Playstation 5");
        product7.setPrice(800.0);
        productRepository.save(product7);

        Product product8 = new Product();
        product8.setProductName("TV");
        product8.setPrice(1000.0);
        productRepository.save(product8);


    }*/

}
