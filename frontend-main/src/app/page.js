import Link from 'next/link';
import ArticleWall from "@/app/article/page";
import Footer from './components/footer';

export default function Home()
{
    return (
        <div className="container">
            <header>
                <h1>Blogování s JS</h1>
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

            {/* Sekce pro blogovou zeď */}
            <ArticleWall />  {/* Zobrazíme příspěvky */}

            <div>
                {/* Přidání footeru */}
                <Footer />
            </div>
        </div>
    );
}