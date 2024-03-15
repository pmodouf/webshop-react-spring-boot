package com.podwebshop.podwebshopbackend.service;


import com.podwebshop.podwebshopbackend.dto.CartDto;
import com.podwebshop.podwebshopbackend.dto.OrderDto;
import com.podwebshop.podwebshopbackend.dto.ProductDTO;
import com.podwebshop.podwebshopbackend.model.Cart;
import com.podwebshop.podwebshopbackend.model.Order;
import com.podwebshop.podwebshopbackend.model.Product;
import com.podwebshop.podwebshopbackend.model.User;
import com.podwebshop.podwebshopbackend.repository.OrderRepository;
import com.podwebshop.podwebshopbackend.repository.ProductRepository;
import com.podwebshop.podwebshopbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);


    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {
        log.debug("Creating order with orderDto: {}", orderDto);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Användaren hittades inte"));
        log.debug("Användare {} har autentiserats och kommer att associeras med ordern.", user.getEmail());
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());

        List<Cart> carts = orderDto.getCarts().stream().map(cartDto -> {
            // Kontrollera om productId är null
            if (cartDto.getProduct() == null || cartDto.getProduct().getId() == null) {
                log.error("Produkt ID är null för en av produkterna i ordern");
                throw new RuntimeException("Produkt ID kan inte vara null");
            }

            Long productId = cartDto.getProduct().getId(); // Extrahera productId
            log.debug("Försöker hämta produkt med ID: {}", productId);
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Produkten hittades inte"));
            Cart cart = new Cart();
            cart.setProduct(product);
            cart.setQuantity(cartDto.getQuantity());
            log.debug("Lägger till produkt med ID {} till ordern, kvantitet: {}", productId, cartDto.getQuantity());
            cart.setOrder(order);
            return cart;
        }).collect(Collectors.toList());

        order.setCarts(carts);
        Order savedOrder = orderRepository.save(order);
        log.debug("Order skapad med ID: {}", savedOrder.getId());

        // Konvertera den sparade Order-entiteten tillbaka till en OrderDto
        OrderDto savedOrderDto = convertToOrderDto(savedOrder);
        log.debug("OrderDto skapad med ID: {}", savedOrderDto.getId());

        return savedOrderDto;
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
    private OrderDto convertToOrderDto(Order order) {
        log.debug("Påbörjar konvertering av Order med ID: {} till OrderDto", order.getId());

        List<CartDto> cartDtos = order.getCarts().stream()
                .filter(cart -> cart.getOrder().getId().equals(order.getId())) // Se till att endast inkludera varukorgar som hör till ordern
                .map(this::convertToCartDto) // Antag att du har en metod som heter convertToCartDto
                .collect(Collectors.toList());

        OrderDto orderDto = new OrderDto(order.getId(), cartDtos, order.getOrderDate());
        log.debug("Konvertering av Order till OrderDto slutförd. Order ID: {}, Antal varukorgsobjekt: {}, Orderdatum: {}",
                orderDto.getId(), orderDto.getCarts().size(), orderDto.getOrderDate());

        return orderDto;
    }

    public CartDto convertToCartDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());

        log.info("ProduktID: {}, Namn: {}, Pris: {}", cart.getProduct().getId(), cart.getProduct().getProductName(), cart.getProduct().getPrice());

        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(cart.getProduct().getId());
        productDTO.setProductName(cart.getProduct().getProductName());
        productDTO.setPrice(cart.getProduct().getPrice());
        cartDto.setProduct(productDTO);
        cartDto.setQuantity(cart.getQuantity());
        return cartDto;
    }




}
