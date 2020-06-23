import React from 'react'
import {Typography} from 'antd'

function NotFound({message='NOT FOUND'}) {
    return <Typography.Title
        style={{height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        {message}
    </Typography.Title>
}

export default NotFound