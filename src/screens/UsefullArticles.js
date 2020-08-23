import React from 'react';
import { useSelector } from 'react-redux';

function UsefullArticlesScreen({ history }) {
    const { allArticles } = useSelector(({ articles }) => articles);

    const canShow = allArticles.length > 0;

    return (
        <div className="page page-articles">
            {canShow && <div className="articles">
                {allArticles.map(one => <ArticlePreview {...one} key={one.name} history={history} />)}
            </div>}
        </div>
    );
}

function ArticlePreview({ title, created_at, author, description, article_id, history }) {
    const goToArticle = () => {
        history.push(`/articles/${article_id}`);
    };
    return (
        <div className="article-preview" onMouseDown={goToArticle}>
            <span className="title">{title}</span>
            <span className="description">{description}</span>
            <div className="addition-info">
                <span className="datetime">Posted at {created_at}</span>
                <abbr className="author">Author {author}</abbr>
            </div>
        </div>
    );
}

export default UsefullArticlesScreen;