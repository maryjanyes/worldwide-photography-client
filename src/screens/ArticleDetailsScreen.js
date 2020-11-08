import { useParams } from "react-router-dom";

const ArticleDetailsScreen = ({ title, content, tags }) => {
  const { article_id } = useParams();
  return (
    <section className="article-item">
      <span className="article-item-name">{title}</span>
      <blockquote dangerouslySetInnerHTML={{ __html: content }}></blockquote>
      <div className="article-item-tags">
        {tags && tags.map((one) => <span>{one.name}</span>)}
      </div>
    </section>
  );
};

export default ArticleDetailsScreen;
