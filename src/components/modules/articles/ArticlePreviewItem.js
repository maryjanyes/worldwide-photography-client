import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { pathToPhoto, getDateString, getTranslationStr } from "utils/data.util";

const ArticlePreviewItem = ({
    title,
    created_at,
    author,
    description,
    article_id,
    history,
    avatar_path,
  }) => {
    const { activeLanguage, translations } = useSelector(({ ui }) => ui);
  
    const goToArticle = () => {
      history.push(`/articles/all/${article_id}`);
    };
  
    const photoPath = useMemo(() => pathToPhoto(avatar_path), [avatar_path]);

    return (
      <div className="article-preview" onClick={goToArticle}>
        <img src={photoPath} className="article-preview__avatar" />
        <div className="article-preview__content">
          <span className="article-preview__title">{translations[getTranslationStr(title, activeLanguage)] || '--Title--'}</span>
          <span className="article-preview__description">{description}</span>
          <div className="article-preview__addition-info">
            <div className="article-preview__addition-info-block">
              <span>{translations[getTranslationStr("common.article_preview.article_date_placeholder", activeLanguage)]}</span>
              <span>{getDateString(created_at)}</span>
            </div>
            <div className="article-preview__addition-info-block">
              <span>{translations[getTranslationStr("common.photo_author", activeLanguage)]}</span>
              <span>{author?.full_name} ({author?.email})</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ArticlePreviewItem
