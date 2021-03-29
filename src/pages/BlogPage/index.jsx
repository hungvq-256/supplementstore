import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import React from 'react';
import { useParams } from 'react-router';
import { articles } from "../HomePage/component/Blogs/articles";
import "./style.scss";

function BlogPage(props) {
    const { articleparams } = useParams();
    let article = articles.find((item) => item.title.toLowerCase().indexOf(articleparams.split('-').join(' ')) !== -1);
    return (
        <div className="article">
            <div className='container'>
                <div className="articlemain">
                    <h1 className="articlemain__title">{article.title}</h1>
                    <p className="articlemain__subtitle">{article.subtitle}</p>
                    <div className="articlemain__mainimg">
                        <img src={article.img} alt="" />
                    </div>
                    <div className="articlemain__content">
                        <div className="author">
                            <div className="author__img">
                                <img src={article.authorImg} alt="author img" />
                            </div>
                            <div className="author__info">
                                <p className="author__info-name">{article.author}</p>
                                <div className="author__info-time">
                                    <p>{article.created}</p>
                                    <p className="readingtime"><QueryBuilderIcon />{article.readingTime}</p>
                                </div>
                            </div>
                        </div>
                        <p className="maincontent">{`${article.content}  . . .`}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BlogPage;