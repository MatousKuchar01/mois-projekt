"use client";

import {useState} from "react";

export default function Profile()
{
    const [password, setPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        //DOPLNIT LOGIKU
        console.log(`Heslo změněno na: ${password}`);
    };

    return (
        <div className="container">
            <h2>Váš profil</h2>
            <form onSubmit={handleChangePassword}>
                <label>Nové heslo:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}