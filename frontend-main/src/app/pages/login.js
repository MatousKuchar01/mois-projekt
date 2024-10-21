import {useState} from "react";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        //DOPLNIT LOGIKU
        console.log(`Přihlásit se s ${email}, ${password}`);
    };

    return (
      <div className="container">
          <h2>Přihlásit se</h2>
          <form onSubmit={handleLogin}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <label>Heslo:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button type='submit'>Přihlásit se</button>
          </form>
      </div>
    );
}