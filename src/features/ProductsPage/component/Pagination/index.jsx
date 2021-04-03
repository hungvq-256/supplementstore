import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            display: "flex",
            justifyContent: "center"
        },
    },
}));

export default function PaginationRounded({ onReceivePaginationClick, count, page }) {
    const classes = useStyles();
    const handleChangePagination = (e, page) => {
        onReceivePaginationClick(page);
    }
    return (
        <div className={classes.root}>
            <Pagination
                count={count}
                variant="outlined"
                color="primary"
                onChange={handleChangePagination}
                page={page}
            />
        </div>
    );
}