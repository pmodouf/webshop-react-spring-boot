import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook för att navigera

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
        <div>
            <h2>Logga in</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
};
