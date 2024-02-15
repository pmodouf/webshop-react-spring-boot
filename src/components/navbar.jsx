import React from "react";
import { Link } from 'react-router-dom';
import { ShoppingCart,UserCircle, SignIn } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left-links">
                <Link to="/login">
                    <SignIn size={32} /> Logga in</Link>
                <Link to="/register">
                    <UserCircle size={32} /> Registrera</Link>
            </div>
            <div className="links">
                <Link to="/">
                    Shop</Link>
                <Link to="/cart">
                    <ShoppingCart size={32} color="white" />
                </Link>
            </div>
        </div>
    );
};
