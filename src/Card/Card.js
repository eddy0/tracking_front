import React, {useEffect, useState} from 'react'
import {Button} from "antd";
import CardList from "./CardList";
import {TopicApi} from '../api'
import {log} from '../utils'

function Card(props) {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        TopicApi.all().then((res) => {
            log(res)
            setTopics(res.data.result)
        })
    }, [])

    return (
        <main className={'main'}>
            <div className="main-container">
                <CardList list={topics} />
            </div>
        </main>
    );
}

export default Card;