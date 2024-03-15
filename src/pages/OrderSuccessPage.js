import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Tack för din beställning!</h1>
            <p>Din order har skapats framgångsrikt.</p>
            <div>
                <button onClick={() => navigate('/')}>Continue Shopping</button>
                <button onClick={() => navigate('/orders')}>Show My Orders</button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
