import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { fetchProducts, fetchProductsFail, fetchProductsSuccess } from '../../actions/products';
import productsApi from '../../api/productsApi';
import ActionAdmin from './components/ActionAdmin';
import ProductsAdminPage from './components/ProductsAdminPage';
import './style.scss';


const AdminPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const RequestFetchProducts = () => async dispatch => {
            try {
                dispatch(fetchProducts);
                const products = await productsApi.getAll();
                dispatch(fetchProductsSuccess(products));
            }
            catch (error) {
                dispatch(fetchProductsFail(error));
            }
        }
        dispatch(RequestFetchProducts());
    }, [dispatch]);
    return (
        <div className="container">
            <Switch>
                <Route path='/admin' exact><ProductsAdminPage /></Route>
                <Route path='/admin/edit/product-:id' component={ActionAdmin}></Route>
                <Route path='/admin/add-new-product' component={ActionAdmin}></Route>
            </Switch>
        </div>
    );
};

export default AdminPage;