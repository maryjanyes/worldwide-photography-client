import React from 'react';
import { useSelector } from 'react-redux';

function UsefullArticlesScreen() {
    const { articles } = useSelector(({ articles }) => articles);

    const canShow = articles.length > 0;

    return (
        <div className="page page-usefull-articles">
            <span className="article-text">One more Blog about world of photography</span>
            {canShow && <div className="articles-line">
                {articles.map(one => <Article key={one.name} {...one} />)}
            </div>}
        </div>
    );
}

function Article(props) {
    return (
        <section className="article">
            <p>{props.name}</p>
            <blockquote></blockquote>
        </section>
    );
}

export default UsefullArticlesScreen;