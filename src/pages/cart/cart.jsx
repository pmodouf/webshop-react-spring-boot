import React, { useContext } from "react";
import { CartItem } from "./cart-item";
import { ShopContext } from "../../context/shop-context";
import "./cart.css";
import OrderComponent from "../../context/OrderComponent";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
    const { cartItems, getTotalCartAmount, products } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();


    const cartProducts = products.filter(product => cartItems[product.id]);

    return (
        <div className="cart">
            <div>
                <span className="font-semibold text-3xl  text-gray-900">Cart Items</span>
            </div>
            <div className="cartItems">
                {cartProducts.map((product) => (
                    <CartItem key={product.id} data={product} />
                ))}
            </div>
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                    <OrderComponent />
                </div>
            ) : <h1>The Cart Is Empty</h1>}
        </div>
    );
};
