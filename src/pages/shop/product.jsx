import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { productImageMap } from './productImageMap';
export const Product = ({ data }) => {
    const { id, productName, price } = data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const imageUrl = `/assets/${productImageMap[productName]}`;

    const cartItemAmount = cartItems[id];

    return (
        <div className="product">
            <img src={imageUrl} alt={productName} />
            <div className="description">
                <p><b>{productName}</b></p>
                <p>${price}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
        </div>
    );
};
