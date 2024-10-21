"use client";

import { useState, useEffect } from 'react';
import '/src/app/styles/article.css';

export default function ArticleWall() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch("http://localhost:5000/stories_service-main/articles");
                const data = await res.json();
                if (res.ok) {
                    setArticles(data); // upravit
                } else {
                    console.error("Chyba při načítání článků");
                }
            } catch (error) {
                console.error("Chyba při připojování k serveru", error);
            }
        }
        fetchArticles();
    }, []);

    return (
        <div className="blog-wall">
            <h2 className="wall-h2">Nejnovější příspěvky</h2>
            <div className="wall">
                {articles.map((article) => (
                    <div key={article.id} className="post">
                        <h3>{article.title}</h3>
                        <p>{article.content.substring(0, 150)}...</p>
                        <a href={`/articles/${article.id}`}>Přečíst více</a>
                    </div>
                ))}
            </div>
        </div>
    );
}