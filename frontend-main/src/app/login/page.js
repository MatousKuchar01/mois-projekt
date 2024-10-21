"use client";

import '/src/app/styles/login-register.css'

import {useState} from "react";
import { useRouter } from "next/navigation";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/users_service-main/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Uložíme token do localStorage
                localStorage.setItem("token", data.token);
                await router.push("/dashboard"); // nebo kamkoliv jinam po přihlášení
            } else {
                alert("Chyba při přihlášení: " + data.message);
            }
        } catch (error) {
            console.error("Chyba při přihlášení", error);
        }
    };

    return (
        <div className="container">
            <h2>Přihlášení</h2>
            <form onSubmit={handleLogin} className="login-form"> {/* Přidána třída */}
                <label>Email:</label>
                <input type="email" className="login-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Heslo:</label>
                <input type="password" className="login-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit' className="login-button">Přihlásit se</button>
            </form>
        </div>
    );
}