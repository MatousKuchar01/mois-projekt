"use client";

import Link from 'next/link';
import ArticleWall from "@/app/article/page";
import Footer from './components/footer';
import Header from './components/header';
import {useState} from "react";

export default function Home()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogout = async () => {
        try {
            const res = await fetch("/users/logout", {
                method: "GET",
            });
            if (res.ok) {
                setIsLoggedIn(false);
                setUsername('');
                alert("Úspěšně odhlášeno");
            } else {
                alert("Chyba při odhlašování");
            }
        } catch (error) {
            console.error("Chyba při odhlašování", error);
        }
    };


    return (
        <div className="container">
            <header className="header">
                <img src="/images/logo.png" alt="Logo" className="logo"/>
            </header>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username}/>
            <section className="add-article-section">
                <Link href="/create-article">
                    <button>Přidat článek</button>
                </Link>
            </section>
            <ArticleWall/>
            <Footer/>
        </div>
    );
}