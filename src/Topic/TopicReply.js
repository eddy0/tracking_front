import React from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment';
import {log} from '../utils'

const TopicReply = ({reply}) => {
    const {author, content, updated_time} = reply
    return (
        <Comment
            author={<a>{author.username}</a>}
            avatar={
                <Avatar>{author.username.split(' ')[0] || 'U'}</Avatar>
            }
            content={<p>{content}</p>}
            datetime={
                <Tooltip title={moment(updated_time).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(updated_time).fromNow()}</span>
                    {updated_time}
                </Tooltip>
            }
        />
    )
}

export default TopicReply