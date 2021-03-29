import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ProductDetailSkeleton() {
    return (
        <div className="container" style={{ background: '#ffffff', padding: '15px 0', overflow: 'hidden', }}>
            <Skeleton variant="text" width={500} height={40} />
            <Skeleton variant="text" width={120} height={30} />
            <div className="row" style={{ marginTop: '10px', paddingTop: "15px", borderTop: "1px solid #e1e1e1" }}>
                <div className="col-12 col-md-4">
                    <Skeleton variant="rect" width={240} height={260} style={{ margin: '0 auto 10px', }} />
                </div>
                <div className="col-12 col-md-8" style={{ paddingLeft: '15px', }}>
                    <Skeleton variant="text" width={120} height={40} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={20} style={{ marginBottom: "20px", }} />
                    <Skeleton variant="text" width={60} height={30} />
                    <Skeleton variant="text" height={70} />
                    <Skeleton variant="text" width={220} height={70} />
                </div>
            </div>
        </div>
    );
}