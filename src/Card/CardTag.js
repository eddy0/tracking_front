import React from 'react';
import {Tag} from "antd";

const tags = {
    1: 'Front end',
    2: 'Back end',
    3: 'Note',
}

function CardTag(props) {

    const tag = tags[props.tag]
    return (
        <div style={{display:"flex", alignItems:"center", padding:'0 0 1rem 0'}}>
            <Tag > {tag}</Tag>
        </div>
    );
}

export default CardTag;