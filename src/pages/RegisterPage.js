import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Registrera dig</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrera</button>
            </form>
        </div>
    );
};
