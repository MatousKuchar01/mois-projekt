import {useState} from "react";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        //DOPLNIT LOGIKU
        console.log(`Registrovat se s: ${email}, ${password}`);
    };

    return (
        <div className="container">
            <h2>Registrace</h2>
            <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Heslo:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Registrovat</button>
            </form>
        </div>
    );
}
