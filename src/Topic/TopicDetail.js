import React, {useEffect, useState} from 'react'
import './TpicDetail.css'
import {TopicApi} from '../api/api'
import {log} from '../utils'
import {Link, useHistory} from 'react-router-dom'
import {Avatar, Spin} from 'antd'
import {Redirect} from 'react-router'
import NotFound from '../NotFound'
import MarkdownIt from 'markdown-it'

function TopicDetail(props) {

    const mdParser = new MarkdownIt()

    const [topic, setTopic] = useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const id = props.match.params.id
        TopicApi.get(id).then(data => {
            setTopic(data)
        }).catch(err => {
            if (err.code === 404) {
                setTopic(null)
            }
        }).finally(() => {
                setLoading(false)
            }
        )
    }, [])

    if (loading === true) {
        return <Spin
            style={{display: 'flex', wdith: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}
            spinning={true} size={'large'} tip="Loading..."/>
    }

    if (topic === null) {
        return <NotFound/>
    }


    const {author, title, content, created_time, views, html} = topic
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
                {
                    topic['permission_id'] === 2
                        ? <NotFound message={'No Permission'}/>
                        : <div className="content-detail"
                               dangerouslySetInnerHTML={{__html: mdParser.render(content)}}/>
                }

            </article>
        </section>
    )
}

export default TopicDetail