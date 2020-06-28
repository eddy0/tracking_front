import React, {useContext, useEffect, useState} from 'react'
import './TpicDetail.css'
import {ReplyApi, TopicApi} from '../api/api'
import {log} from '../utils'
import {Link, useHistory} from 'react-router-dom'
import {Avatar, Button, Col, Row, Spin} from 'antd'
import NotFound from '../NotFound'
import MarkdownIt from 'markdown-it'
import {RootContext} from '../App'
import TopicReply from './TopicReply'
import ReplyNew from './ReplyNew'

function TopicDetail(props) {
    const {state} = useContext(RootContext)

    const mdParser = new MarkdownIt()

    const [topic, setTopic] = useState(null)
    const [replies, setReplies] = useState([])
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const history = useHistory()

    useEffect(() => {
        const id = props.match.params.id
        TopicApi.get(id).then(data => {
            log(data)
            const {topic} = data
            setTopic(topic)
            setReplies(data.replies)
        }).catch(err => {
            if (err.code === 404) {
                setTopic(null)
            }
        }).finally(() => {
                setLoading(false)
            }
        )
    }, [])

    const handleSubmit = () => {
        if (!comment) {
            return
        }
        setSubmitting(true)
        const {token} = state
        const id = props.match.params.id
        const data =  {
            topic_id: id,
            content: comment,
        }
        ReplyApi.new({token, data}).then(res => {
            console.log(res)
            setReplies([...replies, res.reply])
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setComment('')
            setSubmitting(false)
        })
    }

    const handleChange = e => {
        setComment(e.target.value)
    }


    if (loading === true) {
        return <Spin
            style={{display: 'flex', wdith: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}
            spinning={true} size={'large'} tip="Loading..."/>
    }

    if (topic === null) {
        return <NotFound/>
    }


    const {id, author, title, content, created_time, views} = topic
    // log(replies)
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
                {
                    state.user && state.user.id === author.id
                        ? (<Button className="content-edit">
                            <Link to={`/topic/${id}/edit`}>edit</Link>
                        </Button>)
                        : null
                }

                <div className="content-info">
                    <span className="feed-views">{views} views</span>
                    <span className="feed-date">
                published by {created_time}
            </span>
                </div>
                {
                    state.user && state.user.id !== author.id && topic['permission_id'] === 2
                        ? <NotFound message={'No Permission'}/>
                        : <div className="content-detail"
                               dangerouslySetInnerHTML={{__html: mdParser.render(content)}}/>
                }
            </article>

            {
                replies && replies.length > 0 &&
                <Row>
                    <Col span={24}>
                        {
                            replies.map((reply) => {
                                return <TopicReply reply={reply} key={reply.id}/>
                            })
                        }

                    </Col>
                </Row>
            }

            <ReplyNew comment={comment} submitting={submitting} handleChange={handleChange}
                      handleSubmit={handleSubmit}/>

        </section>
    )
}

export default TopicDetail