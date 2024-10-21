export default function Article({article}) {
    return (
      <div className="container">
          <h2>{article.title}</h2>
          <div>{article.content}</div>
      </div>
    );
}