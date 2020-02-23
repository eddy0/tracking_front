import React from 'react'
import '../src/index.css'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '../src/reducer'
import middleware from '../src/middleware'
import Navbar from '../src/components/Navbar'


const store = createStore(reducer, middleware)



function MyApp({Component, props}) {

    return (
        <Provider store={store}>
            <Navbar/>
            <div className="container" style={{paddingTop: '100px'}}>

                <Component {...props} />
            </div>
        </Provider>
    )
}





export default MyApp
