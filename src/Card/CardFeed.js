import React from 'react';
import {Avatar, Divider, List} from "antd";

function BlogAuthor(props) {
    const {user} = props
    return (
        <div>
            <Avatar size={"small"} > {user.username}</Avatar>
            <a href={`user/${user.id}`}>{user.username}</a>
        </div>
        );
}

function CardFeed(props) {
    const {user, created_time} = props
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <BlogAuthor user={user} />
            <Divider type={"vertical"} />
            <span> {created_time}</span>
        </div>
          );
}


export default CardFeed;