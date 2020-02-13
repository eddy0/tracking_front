import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers =  compose

const middlewareEnhancer = composeEnhancers(
    applyMiddleware(
        thunk
    ),
)

export default middlewareEnhancer