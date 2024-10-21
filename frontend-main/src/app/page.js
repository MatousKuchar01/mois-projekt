import Link from 'next/link';

export default function Home()
{
    return (
        <div className="container">
            <header>
                <h1>Blogová aplikace</h1>
                <nav>
                    <Link href="/login">
                        Přihlásit se
                    </Link>
                    <Link href="/register">
                        Registrovat se
                    </Link>
                </nav>
            </header>

            {/* Sekce pro přidání článku */}
            <section className="add-article-section">
                <Link href="/create-article">
                    <button>Přidat článek</button>
                </Link>
            </section>

            {/* Další obsah domovské stránky */}
        </div>
    );
}