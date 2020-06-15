import React from 'react';
import {Avatar} from "antd";

function CardType(props) {
    return (
        <div className="card-type">
            <Avatar size={"large"} style={{color: '#f56a00', backgroundColor: '#fde3cf'}}> 转载 </Avatar>
        </div>
    );
}

export default CardType;