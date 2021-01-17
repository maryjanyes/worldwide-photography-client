import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { getTranslationStr, pathToPhoto } from 'utils/data.util';

function UsefullArticlesScreen({ history }) {
  const { allArticles, siteUsers, translations, activeLanguage } = useSelector(({ users, articles, ui }) => ({
    ...articles,
    ...users,
    ...ui,
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
      <span className="page-title">{translations[getTranslationStr('pages.articles_page.title', activeLanguage)]}</span>
      {(canDisplayArticles && (
        <div className="articles-line">
          {allArticles.map(withAuthors).map((one) => (
            <ArticlePreview {...one} key={one.name} history={history} />
          ))}
        </div>
      )) || <p className="no-section-content">{translations[getTranslationStr('pages.common.no_items', activeLanguage)]}</p>}
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
  avatar_path,
}) {
  const goToArticle = () => {
    history.push(`/articles/${article_id}`);
  };

  const photoPath = useMemo(() => pathToPhoto(avatar_path, [avatar_path]));

  return (
    <div className="article-preview" onClick={goToArticle}>
      <img src={photoPath} className="article-preview__avatar" />
      <div className="article-preview__content">
        <span className="article-preview__title">{title}</span>
        <span className="article-preview__description">{description}</span>
        <div className="article-preview__addition-info">
          <span className="datetime">Posted at {created_at}</span>
          <abbr className="author">Author {author && author.email}</abbr>
        </div>
      </div>
    </div>
  );
}

export default UsefullArticlesScreen;
