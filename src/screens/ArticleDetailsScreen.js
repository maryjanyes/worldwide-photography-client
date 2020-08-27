const ArticleDetails = ({ title, content, tags }) => {
    return (
        <section className="article-item">
            <span className="article-item-name">{title}</span>
            <blockquote dangerouslySetInnerHTML={{ __html: content }}></blockquote>
            <div className="article-item-tags">
                {tags.map(one => <span>{one.name}</span>)}
            </div>
        </section>
    );
};
