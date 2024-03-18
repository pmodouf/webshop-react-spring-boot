import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import  {productImageMap} from "../shop/productImageMap";


export const CartItem = ({ data }) => {
    const { id, productName, price } = data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);


    const productImage = `/assets/${productImageMap[productName] || 'default.png'}`;

    return (
        <div className="cartItem">
            <img src={productImage} alt={productName} className="cart-item-image"/>
            <div className="description">
                <p><b>{productName}</b></p>
                <p>${price}</p>
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button>
                    <input type="number" value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id )}/>
                    <button onClick={() => addToCart(id, 1)}> + </button> {/* Antar att andra parametern är kvantitet att lägga till */}
                </div>
            </div>
        </div>
    );
};
