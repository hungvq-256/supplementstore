import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addProduct, editProduct } from '../../../../actions/products';
import productsApi from '../../../../api/productsApi';

const ActionAdmin = (props) => {
    const [data, setData] = useState({
        id: '',
        title: '',
        quantity: 1,
        price: '',
        type: '',
        img: '',
    })
    const dispatch = useDispatch();

    const { id } = useParams();
    const handleOnEdit = async (id) => {
        try {
            let response = await productsApi.get(id);
            setData(prevalue => ({
                ...prevalue,
                id: response.id,
                title: response.title,
                price: response.price,
                type: response.type,
                img: response.img
            }))
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (id) {
            handleOnEdit(id);
        }
    }, [id]);

    const handleOnChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        setData(prevalue => ({
            ...prevalue,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id === '') {
            const requestAddProduct = (data) => async dispatch => {
                try {
                    const response = await productsApi.add(data);
                    dispatch(addProduct(response));
                }
                catch (error) {
                    console.log(error);
                }
            }
            dispatch(requestAddProduct(data));
        } else {
            const postEditProduct = (data) => async dispatch => {
                try {
                    let response = await productsApi.update(data);
                    dispatch(editProduct(response));
                }
                catch (error) {
                    console.log(error);
                }
            }
            dispatch(postEditProduct(data));
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-full-width"
                label="Product Name"
                style={{ margin: 8 }}
                placeholder="Insert name of product"
                fullWidth
                margin="normal"
                variant="outlined"
                name="title"
                value={data.title}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="outlined-full-width"
                label="Type"
                style={{ margin: 8 }}
                placeholder="Insert type of product"
                fullWidth
                margin="normal"
                variant="outlined"
                name="type"
                value={data.type}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="outlined-full-width"
                label="Price"
                style={{ margin: 8 }}
                placeholder="Insert price of product"
                fullWidth
                margin="normal"
                variant="outlined"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="outlined-full-width"
                label="Image Link"
                style={{ margin: 8 }}
                placeholder="Insert image of product"
                fullWidth
                margin="normal"
                variant="outlined"
                name="img"
                value={data.img}
                onChange={handleOnChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained" style={{ marginRight: '10px' }}>
                <Link
                    style={{
                        color: "#000000",
                        textDecoration: "none",
                    }} to='/admin'>Back</Link>
            </Button>
            <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
        </form>
    );
};

export default ActionAdmin;