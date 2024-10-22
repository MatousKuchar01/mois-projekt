import Link from 'next/link';

export default function Header({ isLoggedIn, handleLogout, username }) {
    return (
        <header>
            <h1>Blogování s JS</h1>
            <nav>
                {isLoggedIn ? (
                    <>
                        <span>Přihlášený uživatel: {username}</span>
                        <Link href="/profile">Můj profil</Link>
                        <button onClick={handleLogout}>Odhlásit se</button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Přihlásit se</Link>
                        <Link href="/register">Registrovat se</Link>
                    </>
                )}
            </nav>
        </header>
    );
}