import React, { useMemo } from "react";

import { pathToPhoto } from 'utils/data.util';

const ArticlePreviewItem = ({
    title,
    created_at,
    author,
    description,
    article_id,
    history,
    avatar_path,
  }) => {
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
            {created_at && <span className="datetime">Posted at {created_at}</span>}
            <span className="author">Author {author && author.email}</span>
          </div>
        </div>
      </div>
    );
}

export default ArticlePreviewItem
