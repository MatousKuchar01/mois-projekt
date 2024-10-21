"use client";

import '/src/app/styles/login-register.css'

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState('');
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
            const res = await fetch("http://localhost:5000/users_service-main/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Uložíme token do localStorage
                alert("Účet vytvořen! Můžete se přihlásit.");
                await router.push("/login"); // nebo kamkoliv jinam po přihlášení
            } else {
                alert("Chyba při registraci: " + data.message);
            }
        } catch (error) {
            console.error("Chyba při registraci", error);
        }
    };

    return (
        <div className="container">
            <h2>Registrace</h2>
            <form onSubmit={handleRegister} className="register-form"> {/* Přidána třída */}
                <label>Email:</label>
                <input type="email" className="register-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Heslo:</label>
                <input type="password" className="register-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit' className="register-button">Registrovat se</button>
            </form>
        </div>
    );
}
