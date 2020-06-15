import React from 'react';
import {Avatar, Divider, List} from "antd";

function BlogAuthor(props) {
    const {item} = props
    return (
        <div>
            <Avatar size={"small"} src={item.avatar} />
            <a href={item.href}>{item.title}</a>
        </div>
        );
}

function CardFeed(props) {
    const {item} = props
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <BlogAuthor item={item} />
            <Divider type={"vertical"} />
            <span> just now</span>
        </div>
          );
}


export default CardFeed;