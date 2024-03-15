import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../context/AuthContext";
import './ordersPage.css';
import {productImageMap} from "./shop/productImageMap"; // Antag att detta är sökvägen till din nya CSS-fil
// Antag att sökvägen är korrekt

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth(); // Hämta användarinformation från AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            console.log('Fetching orders with token:', token); // Logga token
            try {
                const response = await axios.get('http://localhost:8080/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Orders fetched successfully:', response.data); // Logga responsdata
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error); // Detaljerad felloggning
                if (error.response) {
                    // Servern svarade med en statuskod som faller utanför 2xx
                    console.log('Error response data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                } else if (error.request) {
                    // Begäran skickades men inget svar mottogs
                    console.log('No response received:', error.request);
                } else {
                    // Något gick fel vid skapandet av begäran
                    console.log('Error setting up request:', error.message);
                }
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders">
            <h2>My Orders</h2>
            {user && <p>Logged in as: {user.email}</p>}
            {orders.map((order) => (
                <div className="order" key={order.id}>
                    <p>Order ID: {order.id}</p>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    {order.carts.map((cart, index) => (
                        <div className="orderItem" key={index}>
                            <img src={`/assets/${productImageMap[cart.product.productName] || 'default.png'}`} alt={cart.product.productName} />
                            <div>
                                <p>Product: {cart.product.productName}</p>
                                <p>Quantity: {cart.quantity}</p>
                                <p>Price per item: ${cart.product.price}</p>
                                <p>Subtotal: ${cart.quantity * cart.product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrdersPage;
