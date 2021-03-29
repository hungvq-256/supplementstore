import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProduct } from '../../../../actions/products';
import productsApi from '../../../../api/productsApi';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    root: {
        maxHeight: 500,
    },
    table: {
        minWidth: 650,
    },
    button: {
        cursor: 'pointer',
        color: '#de0101'
    },
    edit: {
        textDecoration: 'none',
        color: '#284bd9'
    },
    container: {
        maxHeight: 440,
    },
    header: {
        background: 'black'
    }
});
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function ProductsAdminPage(props) {
    const classes = useStyles();
    const listProducts = useSelector(state => state.products.listProducts);
    const dispatch = useDispatch();
    const handleDelete = (id) => async dispatch => {
        try {
            await productsApi.remove(id);
            dispatch(removeProduct(id));
        } catch (error) {
            console.log(error);
        }
    }
    const onDelete = (id) => {
        dispatch(handleDelete(id));
    }
    return (
        <>
            <Link className='addnewproduct' to='/admin/add-new-product'><AddIcon /> Add New Product </Link>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">Product Name</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">{product.title}</TableCell>
                                <TableCell align="right">{product.type}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell
                                    className={classes.button}
                                    align="right">
                                    <Link
                                        to={`/admin/edit/product-${product.id}`}
                                        className={classes.edit}
                                    ><EditIcon />
                                    </Link>
                                </TableCell>
                                <TableCell
                                    className={classes.button}
                                    align="left"
                                    onClick={() => { onDelete(product.id) }}>
                                    <DeleteIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
}


export default ProductsAdminPage;