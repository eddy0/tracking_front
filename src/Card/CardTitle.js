import React from 'react';
import {Typography} from "antd";

function CardTitle(props) {
    const title = props.title
    return (
        <Typography.Title level={4}>{title.slice(0,50)}</Typography.Title>
    );
}

export default CardTitle;