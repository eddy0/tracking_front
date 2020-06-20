import React from 'react'
import {Typography} from 'antd'
import {Link} from 'react-router-dom'

function CardTitle({title, id}) {
    return (
        <Link to={`/topic/${id}`}>
            <Typography.Title level={4}>{title.slice(0, 50)}</Typography.Title>
        </Link>
    )
}

export default CardTitle