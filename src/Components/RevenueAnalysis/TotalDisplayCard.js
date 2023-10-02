import React from 'react';
import {Card, Col, Row} from 'antd';

const TotalDisplayCard = ({ title, value }) => {
    return (
        <Card className="total-display-card" title={title}>
            <div className="icon-container">
            </div>
            <h2 className="value">{value}</h2>
        </Card>
    );
};

export default TotalDisplayCard;


