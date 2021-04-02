import React from "react";
import Slider from "react-slick";
import "./style.scss";
import { Link } from "react-router-dom";
import sliderImg1 from '../../../../assets/img/slider-img1f.jpg';
import sliderImg2 from '../../../../assets/img/slider-img2f.jpg';
import sliderImg3 from '../../../../assets/img/slider-img3f.jpg';
import sliderImg4 from '../../../../assets/img/slider-img4f.jpg';
import sliderImg5 from '../../../../assets/img/slider-img5.jpg';
import sliderImg1m from '../../../../assets/img/slider-img1m.jpg';
import sliderImg2m from '../../../../assets/img/slider-img2m.jpg';
import sliderImg3m from '../../../../assets/img/slider-img3m.jpg';
import sliderImg4m from '../../../../assets/img/slider-img6m.jpg';
import sliderImg5m from '../../../../assets/img/slider-img5m.jpg';

export default class SlickSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            sliderIndex: 0
        }
        this.myRef = React.createRef();
    }
    handleActiveTextbox = (index) => {
        let textboxList = this.myRef.current.children;
        for (let i = 0; i < textboxList.length; i++) {
            textboxList[i].className = textboxList[i].className.replace("active", " ");
            textboxList[i].className = textboxList[i].className.replace("active1", " ");
        }
        if (index % 2 === 0) {
            textboxList[index].className = "textbox active";
        } else {
            textboxList[index].className = "textbox active1";
        }
    }
    componentDidMount() {
        this.handleActiveTextbox(0)
    }
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            autoplaySpeed: 3500,
            pauseOnHover: false,
            beforeChange: (current, next) => { this.handleActiveTextbox(next) }
        };
        let textlist = ["Get 20% off your first purchase", "Healthy mind in a healthy body",
            "Good health is good business", "Our aim is your satisfaction", "Keep smiling and shop on"]
        let textbox = textlist.map((item, index) => (
            <div className="textbox" key={index} >
                <h2>{item}</h2>
                <button><Link to='/products'>Shop Now</Link></button>
            </div>
        ))
        return (
            <div className="--slider">
                <Slider {...settings}>
                    <div className="slideritem">
                        <picture>
                            <source media="(min-width:1025px)" srcSet={sliderImg5} />
                            <img src={sliderImg4m} alt="slider-img-1" />
                        </picture>
                    </div>
                    <div className="slideritem">
                        <picture>
                            <source media="(min-width:1025px)" srcSet={sliderImg2} />
                            <img src={sliderImg2m} alt="slider-img-2" />
                        </picture>
                    </div>
                    <div className="slideritem">
                        <picture>
                            <source media="(min-width:1025px)" srcSet={sliderImg3} />
                            <img src={sliderImg3m} alt="slider-img-3" />
                        </picture>
                    </div>
                    <div className="slideritem">
                        <picture>
                            <source media="(min-width:1025px)" srcSet={sliderImg4} />
                            <img src={sliderImg1m} alt="slider-img-4" />
                        </picture>
                    </div>
                    <div className="slideritem">
                        <picture>
                            <source media="(min-width:1025px)" srcSet={sliderImg1} />
                            <img src={sliderImg5m} alt="slider-img-4" />
                        </picture>
                    </div>
                </Slider>
                <div className="textboxwrap" ref={this.myRef}>
                    {textbox}
                </div>
                <div className="scrolldown"></div>
            </div>
        );
    }
}
