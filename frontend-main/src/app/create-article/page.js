"use client";

import '/src/app/styles/create-article.css'

import {useState} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const TinyMCE = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });

export default function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleCreate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Pro přidání článku se musíte přihlásit.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/stories_service-main/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Článek byl úspěšně přidán!");
                router.push("/articles");
            } else {
                alert("Chyba při přidávání článku: " + data.message);
            }
        } catch (error) {
            console.error("Chyba při přidávání článku", error);
        }
    };

    return (
        <div className="container">
            <h2>Vytvořte nový příspěvek</h2>
            <form onSubmit={handleCreate}>
                <TinyMCE
                    apiKey="your-tinymce-api-key"
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                    init={{ height: 500, menubar: false, plugins: ['advlist', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'wordcount'],
                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image' }}
                />
                <button type="submit" className="create-article-button">Přidat článek</button>
            </form>
        </div>
    );
}