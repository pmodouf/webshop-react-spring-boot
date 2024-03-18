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
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <h2 className="font-semibold text-3xl text-gray-900">My Orders</h2>
                {user && <p className="text-gray-700">Logged in as: {user.email}</p>}
                {orders.map((order) => (
                    <div className="order bg-gray-100 p-5 rounded-md shadow my-3" key={order.id}>
                        <h3 className="text-xl font-bold">Order ID: {order.id}</h3>
                        <p className="text-gray-800">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        {order.carts.map((cart, index) => (
                            <div className="orderItem flex items-center space-x-4 my-2" key={index}>
                                <img className="h-20 w-20 object-cover rounded" src={`/assets/${productImageMap[cart.product.productName] || 'default.png'}`} alt={cart.product.productName} />
                                <div>
                                    <p className="font-semibold">{cart.product.productName}</p>
                                    <p>Quantity: {cart.quantity}</p>
                                    <p>Price per item: ${cart.product.price}</p>
                                    <p>Subtotal: ${cart.quantity * cart.product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
