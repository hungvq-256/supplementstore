import React, { Component } from "react";
import productsApi from "../../../../api/productsApi";
import SectionTitle from "../../../../components/SectionTitle";
import CarouselProductItem from "./components/CarouselProductItem";
import SaleImg from '../../../../assets/img/sale.svg';
import './style.scss';

export default class CenterMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: null,
            numberOfItem: 4
        }
        this.widthDeviceRef = React.createRef();
    }

    componentDidMount() {
        (async () => {
            let products = await productsApi.getAll({ isSale: "true" });
            this.setState({
                ...this.state,
                listProducts: products
            })
        })()
        if (this.widthDeviceRef.current.clientWidth <= 375) {
            this.setState({
                ...this.state,
                numberOfItem: 1
            })
        }
        else if (this.widthDeviceRef.current.clientWidth <= 767) {
            this.setState({
                ...this.state,
                numberOfItem: 2
            })
        } else if (this.widthDeviceRef.current.clientWidth <= 991) {
            this.setState({
                ...this.state,
                numberOfItem: 3
            })
        }
        window.addEventListener("resize", () => {
            if (this.widthDeviceRef.current !== null) {
                if (this.widthDeviceRef.current.clientWidth <= 375) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 1
                    })
                }
                else if (this.widthDeviceRef.current.clientWidth <= 767) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 2
                    })
                }
                else if (this.widthDeviceRef.current.clientWidth <= 991) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 3
                    })
                }
                else {
                    this.setState(prevalue => ({
                        ...prevalue,
                        numberOfItem: 4
                    }))
                }
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            if (this.widthDeviceRef.current !== null) {
                if (this.widthDeviceRef.current.clientWidth <= 375) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 1
                    })
                }
                else if (this.widthDeviceRef.current.clientWidth <= 767) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 2
                    })
                }
                else if (this.widthDeviceRef.current.clientWidth <= 991) {
                    this.setState({
                        ...this.state,
                        numberOfItem: 3
                    })
                }
                else {
                    this.setState(prevalue => ({
                        ...prevalue,
                        numberOfItem: 4
                    }))
                }
            }
        })
    }
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: this.state.numberOfItem,
            slidesToScroll: this.state.numberOfItem
        };
        return (
            <div className="container --carousel" ref={this.widthDeviceRef}>
                <div className="carouselTitleWrap">
                    <SectionTitle text={'Sale Off Products'} />
                    <i><img src={SaleImg} alt="sale img" /></i>
                </div>
                {this.state.listProducts && <CarouselProductItem settings={settings} listProduct={this.state.listProducts} />}
            </div>
        );
    }
}