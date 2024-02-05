package com.podwebshop.podwebshopbackend.service;

import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.repository.ProductRepository;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    @Autowired
    public ProductService(ProductRepository productRepository){

        this.productRepository = productRepository;
    }
    public List<Product> getAllProducts(){

        return productRepository.findAll();
    }


    public Object addProduct(Product product) {

        return productRepository.save(product);
    }
    public ProductDTO convertToDTO(Product product){
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


    }

}
