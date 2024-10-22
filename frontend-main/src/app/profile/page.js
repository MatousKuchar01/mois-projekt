"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";

export default function Profile({ isLoggedIn }) {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/users/change_username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ username }),
            });

            if (res.ok) {
                alert('Username changed successfully');
            } else {
                alert('Error changing username');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!isLoggedIn) {
        router.push("/login");
        return null;
    }

    return (
        <div className="container">
            <h2>Váš profil</h2>
            <form onSubmit={handleChangeUsername}>
                <label>Nové uživatelské jméno:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Změnit uživatelské jméno</button>
            </form>
        </div>
    );
}