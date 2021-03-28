import React from "react";
import { useSelector } from "react-redux";

import ArticlePreviewItem from 'components/modules/articles/ArticlePreviewItem';
import { getTranslationStr } from 'utils/data.util';

function ArticlesScreen({ history }) {
  const { allArticles, siteUsers, translations, activeLanguage } = useSelector(({ users, articles, ui }) => ({
    ...articles,
    ...users,
    ...ui,
  }));

  const canDisplayArticles = allArticles.length > 0;

  const withAuthors = article => {
    article.author = siteUsers.find(
      user => user.user_id === article.author_id
    );
    return article;
  };

  return (
    <div className="page page-articles">
      <div className="top-line"></div>
      <span className="page-title">{translations[getTranslationStr('pages.articles_page.title', activeLanguage)]}</span>
      {(canDisplayArticles && (
        <div className="articles-line">
          {allArticles.map(withAuthors).map(article => (
            <ArticlePreviewItem
              {...article}
              key={article.article_id}
              history={history}
            />
          ))}
        </div>
      )) || <p className="no-section-content">{translations[getTranslationStr('pages.common.no_items', activeLanguage)]}</p>}
    </div>
  );
}

export default ArticlesScreen;
