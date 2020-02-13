import {Button} from 'antd'
import React from 'react'
import Router from 'next/router'


function Home() {
    React.useEffect(() => {
        Router.push('/todo')
    })
    return null
}

export default Home