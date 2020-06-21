import React from 'react'
import {List, Avatar, Space, Card} from 'antd'
import CardType from './CardType'
import CardTitle from './CardTitle'
import CardFeed from './CardFeed'
import CardTag from './CardTag'
import CardCTA from './CardCTA'
import {log} from '../utils'

const listData = []

for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}We supply a series of design principles, practical patterns and high quality `,
        author: {
            username: ' test',
            id: 100,
        },
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    })
}


function CardList(props) {
    return (
        <List
            itemLayout="vertical"
            size="large"
            split={true}
            pagination={{
                onChange: page => {
                    console.log(page)
                },
                pageSize: 10,
            }}
            dataSource={[...props.list]}

            renderItem={item => {
                return (<List.Item
                        key={item.id}
                    >
                        <CardType/>
                        <CardTitle id={item.id} title={item.title}/>
                        <CardFeed time={item.created_time} author={item.author}/>
                        <CardTag/>
                        <CardCTA views={item.views || 0}/>
                    </List.Item>
                )
            }}
        />
    )
}

export default CardList
