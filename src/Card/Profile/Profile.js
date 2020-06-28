import React, {useContext, useEffect, useState} from 'react'
import {Col, Descriptions, Divider, Row, Typography} from 'antd'
import {RootContext} from '../../App'
import {Redirect} from 'react-router'
import {log} from '../../utils'
import UserApi from '../../api/api'

const Profile = (props) => {
    const {state} = useContext(RootContext)
    log(state)
    const [fetching, setFetching] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setFetching(true)
        let id = props.match.params.id
        if (id === undefined) {
            let u = localStorage.getItem('user') || null
            if (u !== null) {
                u = JSON.parse(u)
                id = u.id
            } else {
                props.history.push('/login')
            }
        }

        UserApi.get(id).then((res) => {
            setUser(res.user)
        }).catch(err => {
          log(err)
        }).finally(() => {
            setFetching(false)
        })
    }, [])

    if (fetching === true) {
        return <div> loading... </div>
    }

    if (user === null) {
        return <div> no user Found</div>
    }


    const {id, username, role, password, created_time} = user

    return (
        <main className={'main'}>
            <div className="main-container">
                <Row >
                    <Col span={24}>
                        <Typography.Title>
                            Basic
                        </Typography.Title>
                        <Divider/>
                        <Descriptions column={5} title="User Info" bordered>
                            <Descriptions.Item label="id" span={5}>{id}</Descriptions.Item>
                            <Descriptions.Item label="uername" span={5}>{username}</Descriptions.Item>
                            <Descriptions.Item label="role" span={5}>{role}</Descriptions.Item>
                            <Descriptions.Item label="password" span={5}>{password}</Descriptions.Item>
                            <Descriptions.Item label="created time" span={5}>
                                {created_time}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>

                </Row>
            </div>
        </main>
    )
}

export default Profile