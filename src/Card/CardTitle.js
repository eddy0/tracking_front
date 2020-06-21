import React from 'react'
import {Typography} from 'antd'
import {Link} from 'react-router-dom'

function CardTitle({title, id}) {
    return (
        <Typography.Title level={4} >
            <Link to={`/topic/${id}`}>
                {title}
            </Link>
        </Typography.Title>
    )
}

export default CardTitle