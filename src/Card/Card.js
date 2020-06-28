import React, {useEffect, useState} from 'react'
import {Button, Spin} from 'antd'
import CardList from './CardList'
import {TopicApi} from '../api/api'
import {log} from '../utils'
import {error} from '../Modal'
import "./Card.css";

function Card(props) {
    const [topics, setTopics] = useState([])
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)
        TopicApi.all().then((res) => {
            log(res)
            setTopics(res)
        }).catch(err => {
            error('error', `${err}`)
        }).finally(() => {
            setFetching(false)
        })
    }, [])

    if (fetching === true) {
        return <Spin
            style={{display: 'flex', wdith: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center'}}
            spinning={true} size={'large'} tip="fetching data..."/>
    }

    return (
        <main className={'main'}>
            <div className="main-container card">
                <CardList list={topics}/>
            </div>
        </main>
    )
}

export default Card