import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();// Hook för att navigera
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.jwtToken);
                console.log(data.jwtToken);
                localStorage.setItem('token', data.jwtToken);
                console.log(data.jwtToken)// Spara token i localStorage
                alert('Inloggning lyckad!');
                navigate('/'); // Navigera till startsidan eller önskad sida
            } else {
                throw new Error('Inloggning misslyckades');
            }
        } catch (error) {
            console.error('Inloggningsfel:', error);
            alert(error.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="p-8 w-full flex justify-center items-center bg-white shadow">
                <span className="font-semibold text-3xl text-gray-900">Pod Shop</span>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                    <div className="text-left">
                        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Log in</h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium"
                            style={{ backgroundColor: '#6B7280', color: 'white' }} // Exempel: Ersätt med din themeColors eller Tailwind klasser
                        >
                            Sign in
                        </button>
                    </form>
                    <div className="text-center">
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            Don't have an account yet? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
