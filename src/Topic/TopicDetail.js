import React from 'react';
import './TpicDetail.css'

function TopicDetail(props) {
    return (

        <section className="main">
            <div className="feed-author">
                <a href="/user/{{ author._id }}" className="author-avatar">
                    <img src="/user/avatar/{{ author.avatar }}" alt=""/>
                </a>
                <div className="author-detail">
                    <span className="author-name">
                        <a href="/user/{{ author._id }}"> {'author.nickname'} </a>
                    </span>
                    <span className="author-note">
                       {'author.note'}
                    </span>
                </div>
            </div>
            <article className="content-box" data-id="{{topic._id}}">

                <h2 className="content-title">
                    {'topic.title'}
                </h2>

                <div className="content-info">
                    <span className="feed-views">{'topic.views'}views</span>
                    <span className="feed-date">
                published by {'topic.createdTime'}
            </span>
                </div>
                <div className="content-detail">
                    {'topic.content'}
                </div>
            </article>
        </section>
    );
}

export default TopicDetail;