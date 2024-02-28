import React from "react";
import { Link } from 'react-router-dom';
import { ShoppingCart, UserCircle, SignIn, SignOut } from "phosphor-react";
import "./navbar.css";
import { useAuth } from "../context/AuthContext"; // Se till att sökvägen är korrekt för din AuthContext

export const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar">
            <div className="left-links">
                {!user ? (
                    <>
                        <Link to="/login"><SignIn size={32} /> Logga in</Link>
                        <Link to="/register"><UserCircle size={32} /> Registrera</Link>
                    </>
                ) : (
                    <>
                        <span><UserCircle size={32} /> Inloggad: {user.email}</span>
                        <button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><SignOut size={32} /> Logga ut</button>
                    </>
                )}
            </div>
            <div className="links">
                <Link to="/">Shop</Link>
                <Link to="/cart"><ShoppingCart size={32} color="white" /></Link>
            </div>
        </div>
    );
};
