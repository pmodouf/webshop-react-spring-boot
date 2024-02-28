import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ShopContext = createContext(null);


export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(true);

    // Hämta produkter från backend
    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
                initializeCart(response.data);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);



    const initializeCart = (products) => {
        let initialCart = {};
        products.forEach(product => {
            initialCart[product.id] = 0;
        });
        setCartItems(initialCart);
    };


    const addToCart = (productId) => {
        setCartItems(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };


    const removeFromCart = (productId) => {
        setCartItems(prev => ({ ...prev, [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0 }));
    };


    const updateCartItemCount = (newAmount, productId) => {
        setCartItems(prev => ({ ...prev, [productId]: newAmount >= 0 ? newAmount : 0 }));
    };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const product = products.find(p => p.id === Number(productId));
            if (product) {
                totalAmount += cartItems[productId] * product.price;
            }
        }
        return totalAmount;
    };
    const resetCart = () => {
        setCartItems({});
    };


    const contextValue = { products, cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, loading, resetCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};
