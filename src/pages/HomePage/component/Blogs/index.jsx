import React from 'react';
import SectionTitle from '../../../../components/SectionTitle';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { articles } from "./articles";
import "./style.scss";
import { Link } from 'react-router-dom';

function Blogs(props) {
    const convertString = (string) => {
        let newString = '';
        if (string.charAt(string.length - 1) === "?" || string.charAt(string.length - 1) === "!") {
            newString = string.slice(0, string.length - 2);
        } else {
            newString = string
        }
        newString = newString.toLowerCase().split(' ').join('-');
        return newString.toString();
    }
    return (
        <div className="container">
            <SectionTitle text={"Training Blogs"} />
            <div className="bloglist">
                {
                    articles.map((item, index) => (
                        <div className="bloglist__item" key={item.id}>
                            <Link to={`/article/${convertString(item.title)}`} className="bloglist__item-img">
                                <img src={item.img} alt={`blog-img${item.id}`} />
                            </Link>
                            <div className="bloglist__item-textbox">
                                <Link to={`/article/${convertString(item.title)}`} className="title">
                                    <h2 >{item.title}</h2>
                                </Link>
                                <p className="subtitle">{item.subtitle}</p>
                                <div className="created">
                                    <p>{item.created}</p>
                                    <p><QueryBuilderIcon />{item.readingTime}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Blogs;