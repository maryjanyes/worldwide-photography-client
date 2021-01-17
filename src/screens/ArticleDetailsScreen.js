import React from 'react'

import { useParams } from "react-router-dom";

const ArticleDetailsScreen = () => {
  const { article_id } = useParams();

  const { title, content = 'some', tags } = {}

  return (
    <section className="article-details">
      <span className="article-details__name">{title}</span>
      <blockquote dangerouslySetInnerHTML={{ __html: content }}></blockquote>
      {/** <div className="article-item-tags">
        {tags && tags.map((one) => <span>{one.name}</span>)}
      </div> **/}
    </section>
  );
};

export default ArticleDetailsScreen;
