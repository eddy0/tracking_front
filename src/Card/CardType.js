import React from 'react';
import {Avatar} from "antd";

const types = {
    1: '原创',
    2: '转载'
}

const styles = {
    1 : {
        color: '#f56a00', backgroundColor: '#fde3cf'
    },
    2: {
        color: '#2da2c6', backgroundColor: '#e3f1f5'
    }
}


const names = {
    1 : 'original',
    2: 'fork',

}

function CardType(props) {
    const type = types[props.type]
    const style = styles[props.type]
    const name = names[props.type]
    return (
        <div className={`card-type ${name}`}>
            <Avatar size={"large"} style={style}> {type} </Avatar>
        </div>
    );
}

export default CardType;