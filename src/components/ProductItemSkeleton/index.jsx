import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    productiem: {
        width: "100%",
        height: "315px",
        padding: "5px",
        border: "1px solid #e1e1e1",
        borderRadius: "5px",
        background: "#ffffff"
    },
}));

ProductItemSkeleton.propsType = {
    numberOfItem: PropTypes.number,
}
ProductItemSkeleton.defaultProps = {
    numberOfItem: 8,
}
function ProductItemSkeleton({ numberOfItem }) {
    const classes = useStyles();
    return (
        <Box overflow='hidden'>
            <Grid container spacing={3}>
                {(Array.from(new Array(numberOfItem))).map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index} >
                        <Box className={classes.productiem}>
                            <Skeleton animation="wave" variant="rect" height="190px" width="100%" />
                            <Box pt={1}>
                                <Skeleton height="30px" />
                                <Skeleton height="30px" width="30%" />
                                <Skeleton height="50px" width="50%" />
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductItemSkeleton;
