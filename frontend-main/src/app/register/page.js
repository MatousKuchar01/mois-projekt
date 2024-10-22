"use client";

import Link from 'next/link';
import '/src/app/styles/login-register.css';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Hesla se neshodují!');
            return;
        }

        try {
            const res = await fetch("/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ username, password }),
            });

            if (res.ok) {
                alert("Účet vytvořen! Můžete se přihlásit.");
                await router.push("/login");
            } else {
                const data = await res.json();
                alert("Chyba při registraci: " + data.message);
            }
        } catch (error) {
            console.error("Chyba při registraci", error);
        }
    };

    return (
        <div className="container">
            <Link href="/" className="back-button">
                Zpět na hlavní stránku
            </Link>
            <h2>Registrace</h2>
            <form onSubmit={handleRegister} className="register-form">
                <label>Uživatelské jméno:</label>
                <input
                    type="text"
                    className="register-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Heslo:</label>
                <input
                    type="password"
                    className="register-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Potvrdit heslo:</label>
                <input
                    type="password"
                    className="register-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type='submit' className="register-button">Registrovat se</button>
            </form>
        </div>
    );
}