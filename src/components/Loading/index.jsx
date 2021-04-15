import { CircularProgress } from '@material-ui/core';
import React from 'react';

const style = {
    width: "100%",
    height: "calc(100vh - var(--hdheight))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const Loading = () => {
    return (
        <div style={style}>
            <div>
                <CircularProgress size={40} style={{ color: "#000000" }} />
            </div>
        </div>
    );
};

export default Loading;