import React from "react";
import { useSelector } from "react-redux";

function UsefullArticlesScreen({ history }) {
  const { allArticles, siteUsers } = useSelector(({ users, articles }) => ({
    ...articles,
    ...users,
  }));

  const canDisplayArticles = allArticles.length > 0;
  const withAuthors = (article) => {
    article.author = siteUsers.find(
      (user) => user.user_id === article.author_id
    );
    return article;
  };

  return (
    <div className="page page-articles">
      <div className="top-line"></div>
      <span className="page-title">All Articles</span>
      {(canDisplayArticles && (
        <div className="articles-line">
          {allArticles.map(withAuthors).map((one) => (
            <ArticlePreview {...one} key={one.name} history={history} />
          ))}
        </div>
      )) || <p>No available articles.</p>}
    </div>
  );
}

function ArticlePreview({
  title,
  created_at,
  author,
  description,
  article_id,
  history,
}) {
  const goToArticle = () => {
    history.push(`/articles/${article_id}`);
  };

  return (
    <div className="article-preview" onClick={goToArticle}>
      <span className="title">{title}</span>
      <span className="description">{description}</span>
      <div className="addition-info">
        <span className="datetime">Posted at {created_at}</span>
        <abbr className="author">Author {author && author.email}</abbr>
      </div>
    </div>
  );
}

export default UsefullArticlesScreen;
