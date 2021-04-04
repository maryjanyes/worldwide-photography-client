import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getTranslationStr } from "utils/data.util";

import SocialSharing from "components/common/SocialSharing";

const ArticleDetailsScreen = ({ history }) => {
  const { allArticles, translations, activeLanguage } = useSelector(({ articles, ui }) => ({ ...articles, ...ui }));
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [tags] = useState(null); // TODO

  useEffect(() => {
    const articleByID = allArticles.find(_item => _item.article_id == article_id);

    if (articleByID) {
      setArticle(articleByID);
    } else if (allArticles.length) {
      history.goBack();
    }
  }, [allArticles?.length]);

  return article && (
    <div className="page page-article-details">
      <article>
        <h2 className="article-details__name">{translations[getTranslationStr(article.title, activeLanguage)] || '--Title--'}</h2>
        <blockquote dangerouslySetInnerHTML={{ __html: `<b>--Title--</b>` }} />
        {!!tags && <div className="article-details__tags">
          {tags.map(_tag => <span>{_tag.tag_name}</span>)}
        </div>}
        <SocialSharing google={true} fb={true} />
      </article>
    </div>
  );
};

export default ArticleDetailsScreen;
