"use client";

import '/src/app/styles/login-register.css'

import {useState} from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Login()
{
    const [username, setUsername] = useState('');    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({username, password}),
            });

            if (res.ok) {
                setIsLoggedIn(true);
                alert("Přihlášení úspěšné");
                router.push("/");
            } else {
                alert("Chyba při přihlášení");
            }
        } catch (error) {
            console.error("Chyba", error);
        }
    };

    return (
        <div className="container">
            <Link href="/" className="back-button">
                Zpět na hlavní stránku
            </Link>
            <h2>Přihlášení</h2>
            <form onSubmit={handleLogin} className="login-form">
                <label>Uživatelské jméno:</label>
                <input
                    type="text"
                    className="login-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Heslo:</label>
                <input
                    type="password"
                    className="login-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">Přihlásit se</button>
            </form>
            {isLoggedIn && <p>Přihlášený uživatel: {username}</p>}
        </div>
    );
}