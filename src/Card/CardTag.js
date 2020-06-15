import React from 'react';
import {Tag} from "antd";

function CardTag(props) {
    const tags = ['前端', '后端', '笔记']
    return (
        <div>
            {
                tags.map((tag, key) => {
                    return <Tag key={key}> {tag}</Tag>
                })
            }
        </div>
    );
}

export default CardTag;