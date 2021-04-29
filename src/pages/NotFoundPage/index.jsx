import React from 'react';
import notFoundPageImage from '../../assets/img/not-found-product.svg';

const notFoundPage = {
    height: "calc(100vh - var(--hdheight))",
    width: "100%",
    position: "relative",
    marginTop: "var(--hdheight)"
};
const notFoundPageImg = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px"
};
const notFoundPageImgInner = {
    width: "100%",
    height: "100%"
};
const NotFoundPage = () => {
    return (
        <div style={notFoundPage}>
            <div style={notFoundPageImg}>
                <img src={notFoundPageImage} style={notFoundPageImgInner} alt="404 error" />
            </div>
        </div>
    );
};

export default NotFoundPage;