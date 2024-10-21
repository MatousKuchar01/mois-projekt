import {useState} from "react";
import dynamic from "next/dynamic";

const TinyMCE = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), { ssr: false });

export default function CreateArticle()
{
    const [content, setContent] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        //DOPLNIT LOGIKU
        console.log(content);
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
                <button type="submit">Create Article</button>
            </form>
        </div>
    );
}