import React, {useEffect, useState} from 'react'
import './TpicDetail.css'
import {TopicApi} from '../api'
import {log} from '../utils'
import {Link, useHistory} from 'react-router-dom'
import {Avatar, Spin} from 'antd'
import {Redirect} from 'react-router'

function TopicDetail(props) {
    const [topic, setTopic] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const id = props.match.params.id
        TopicApi.get(id).then(res => {
            setTopic(res.data.result)
        }).catch(err => history.push('/404'))
    }, [])

    if (topic === null) {
        return <Spin
            style={{display: 'flex', wdith: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}
            spinning={true} size={'large'} tip="Loading..."/>
    }


    const {author, title, content, created_time, views} = topic
    return (
        <section className="main">
            <div className="feed-author">
                <Link to={`/user/${author.id}`} className="author-avatar">
                    <Avatar>{author.username}</Avatar>
                </Link>
                <div className="author-detail">
                    <Link to={`/user/${author.id}`}>
                    <span className="author-name">
                         {author.username}
                    </span>
                    </Link>
                </div>
            </div>
            <article className="content-box">
                <h2 className="content-title">
                    {title}
                </h2>

                <div className="content-info">
                    <span className="feed-views">{views} views</span>
                    <span className="feed-date">
                published by {created_time}
            </span>
                </div>
                <div className="content-detail"
                     dangerouslySetInnerHTML={{__html: content}}/>
            </article>
        </section>
    )
}

export default TopicDetail