import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const ArticleDetailsScreen = ({ history }) => {
  const { allArticles } = useSelector(({ articles }) => articles);
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articleByID = allArticles.find(_item => _item.id == article_id);

    if (articleByID) {
      setArticle(articleByID);
    } else {
      history.push("/");
    }
  }, []);

  return (
    <div className="page page-article-details">
      <span className="article-details__name">{article?.title}</span>
      <blockquote dangerouslySetInnerHTML={{ __html: 'some' }}></blockquote>
      {/** <div className="article-item-tags">
        {tags && tags.map((one) => <span>{one.name}</span>)}
      </div> **/}
    </div>
  );
};

export default ArticleDetailsScreen;
