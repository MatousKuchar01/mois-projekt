import Link from 'next/link';

export default function Home()
{
    return (
        <div className="container">
            <header>
                <h1>Blogová aplikace</h1>
                <nav>
                    <Link href="pages/login.js">
                        Přihlásit se
                    </Link>
                    <Link href="pages/register.js">
                        Registrovat se
                    </Link>
                </nav>
            </header>

            {/* Sekce pro přidání článku */}
            <section className="add-article-section">
                <Link href="pages/create-article.js">
                    <button>Přidat článek</button>
                </Link>
            </section>

            {/* Další obsah domovské stránky */}
        </div>
    );
}