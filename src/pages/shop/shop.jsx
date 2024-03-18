import {ShopContext} from "../../context/shop-context";
import "./shop.css";
import React, {useContext} from "react";
import { Product } from "./product";
export const Shop = () => {
    const { products, loading } = useContext(ShopContext);

    if (loading) {
        return <div>Laddar produkter...</div>;
    }

    return (
        <div className="shop">
            <div className="shopTitle">
                <span className="font-semibold text-6xl  text-gray-900">Pod Shop</span>
            </div>
            <div className="products">
                {products.map(product => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
}
