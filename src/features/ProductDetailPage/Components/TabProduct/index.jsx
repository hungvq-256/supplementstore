import React, { useEffect, useRef, useState } from 'react';
import supplementFacts from '../../../../assets/img/supplement-facts.png';
import './style.scss';
TabProduct.propTypes = {

};

function TabProduct(props) {
    const tabList = useRef();
    const [index, setIndex] = useState(0);
    const handleActiveTab = (idx) => {
        let tabs = tabList.current.children;
        setIndex(idx);
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace('active', '');
        }
        tabs[idx].className = "active";
    }
    useEffect(() => {
        handleActiveTab(0)
    }, [])
    return (
        <div className="tabproduct">
            <div className="tabs">
                <div className="container">
                    <ul ref={tabList} className="tablist">
                        <li onClick={() => handleActiveTab(0)}>Product Description</li>
                        <li onClick={() => handleActiveTab(1)}> Supplement Facts</li>
                        <li onClick={() => handleActiveTab(2)}> Suggested Use</li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className={index === 0 ? "tabcontent show --description" : "tabcontent --description"}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus nesciunt at provident ipsa autem nihil ea quisquam numquam exercitationem placeat.
                    Enim error sunt nisi culpa nobis molestiae, voluptatem cumque ad!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta corporis ex vitae nisi reiciendis laboriosam hic a ad cumque alias,
                    rem expedita aliquid voluptas dolor deserunt excepturi consectetur quo facilis?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus nesciunt at provident ipsa autem nihil ea quisquam numquam exercitationem placeat.
                    Enim error sunt nisi culpa nobis molestiae, voluptatem cumque ad!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta corporis ex vitae nisi reiciendis laboriosam hic a ad cumque alias,
                    rem expedita aliquid voluptas dolor deserunt excepturi consectetur quo facilis?
                    </p>
                </div>
                <div className={index === 1 ? "tabcontent show --facts" : "tabcontent --facts"}>
                    <img src={supplementFacts} alt="facts" />
                </div>
                <div className={index === 2 ? "tabcontent show --use" : "tabcontent --use"}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus nesciunt at provident ipsa autem nihil ea quisquam numquam exercitationem placeat.
                    Enim error sunt nisi culpa nobis molestiae, voluptatem cumque ad!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta corporis ex vitae nisi reiciendis laboriosam hic a ad cumque alias,
                    rem expedita aliquid voluptas dolor deserunt excepturi consectetur quo facilis?
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TabProduct;