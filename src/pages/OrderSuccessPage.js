import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <div className="p-20 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you for your order!</h1>
                <p className="mb-4">Your order has been successfully created.</p>
                <div className="flex space-x-4">
                    <button onClick={() => navigate('/')} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-150 ease-in-out">Continue Shopping</button>
                    <button onClick={() => navigate('/orders')} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-150 ease-in-out">Show My Orders</button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
