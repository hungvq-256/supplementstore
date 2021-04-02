import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            display: "flex",
            justifyContent: "center"
        },
    },
}));

export default function PaginationRounded({ onReceivePaginationClick, count }) {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const history = useHistory();
    const handleChangePagination = (e, page) => {
        setPage(page);
        onReceivePaginationClick(page);
    }
    useEffect(() => {
        setPage(1);
    }, [history.location.search]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [page]);
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