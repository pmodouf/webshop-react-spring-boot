import {ShopContext} from "../../context/shop-context";
import "./shop.css";
import {useContext} from "react";
import { Product } from "./product";
export const Shop = () => {
    const { products, loading } = useContext(ShopContext);

    if (loading) {
        return <div>Laddar produkter...</div>;
    }

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>POD Shop</h1>
            </div>
            <div className="products">
                {products.map(product => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
}
