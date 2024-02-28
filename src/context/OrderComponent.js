// Import statements
import React, { useContext,useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//import {OrderSuccessPage} from "../pages/OrderSuccessPage";
import {ShopContext} from "./shop-context";

const OrderComponent = () => {
    const { cartItems, resetCart } = useContext(ShopContext);
    console.log({ cartItems });
    const [errorMessage, setErrorMessage] = useState('');
    const [orderStatus, setOrderStatus] = useState('pending');
    const navigate = useNavigate();

    const createOrder = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Om ingen token finns, omdirigera till inloggningssidan
            alert("Du måste vara inloggad för att skapa en order.");
            navigate('/login');
            return;
        }
        const orderDetails = {
            carts: Object.entries(cartItems).map(([productId, quantity]) => ({
                product: { id: productId },
                quantity
            })),
            orderDate: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:8080/api/orders', orderDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log('Order skapad:', response.data);
                setOrderStatus('success');
               // setCartItems({});
                resetCart();
                navigate('/order-success');
            } else {
                throw new Error('Order skapandet misslyckades');
            }
        } catch (error) {
            console.error("Fel vid skapande av order:", error.response || error);
            setOrderStatus('failed');
            setErrorMessage(error.response?.data?.message || 'Ett fel inträffade vid skapandet av ordern.');
            navigate('/login');
        }
    };

    // Antag att du har en knapp som användaren klickar på för att skapa ordern
    return (
        <div>
            {orderStatus === 'failed' && <p className="error-message">{errorMessage}</p>}
            <button onClick={createOrder}>Skapa Order</button>
        </div>
    );
};

export default OrderComponent;
