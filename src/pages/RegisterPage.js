import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate(); // Använd useNavigate-hook här

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (response.ok) {
                // Om förfrågan lyckas, hantera svaret här
                const data = await response.json();
                console.log('Registrering lyckad:', data);
                alert('Registrering lyckad!');

                // Navigera till login-sidan
                navigate('/login'); // Använd navigate-funktionen för att byta till login-sidan
            } else {
                // Om servern svarar med ett fel, hantera det här
                const errorResponse = await response.json();
                console.error('Registreringsfel:', errorResponse);
                alert('Registrering misslyckades.');
            }
        } catch (error) {
            // Om ett nätverksfel inträffar, hantera det här
            console.error('Ett fel inträffade under registreringen:', error);
            alert('Ett fel inträffade. Försök igen.');
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
                        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Register</h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
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
                            style={{
                                backgroundColor: '#6B7280',
                                color: 'white'
                            }}> {/* Anpassa färgerna efter ditt tema */}
                            Sign up
                        </button>
                    </form>
                    <div className="text-center">
                        <Link to="/login" className="text-gray-900 hover:text-gray-900">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};