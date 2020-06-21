import React from 'react';
import {Avatar, Divider, List} from "antd";
import {Link} from 'react-router-dom'

function BlogAuthor(props) {
    const {author} = props
    return (
        <div className={'flex-center'}>
            <Avatar size={"small"} style={{marginRight: 5}} > {author.username}</Avatar>
            <Link to={`user/${author.id}`}>{author.username}</Link>
        </div>
        );
}

function CardFeed(props) {
    const {author, time} = props
    return (
        <div style={{display:"flex", alignItems:"center", padding:'0 0 1rem 0'}}>
            <BlogAuthor author={author} />
            <Divider type={"vertical"}  />
            <span> {time}</span>
        </div>
          );
}


export default CardFeed;