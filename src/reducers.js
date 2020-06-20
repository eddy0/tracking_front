import {save} from './utils'


const reducer = (state={}, action) => {
    switch (action.type) {
        case 'LOGIN':
            const {user, token} = action.payload
            save(action.payload)
            return {
                ...state,
                isAuth: true,
                user: user,
                token: token
            }
        case 'LOGOUT':
            window.localStorage.clear()
            return {
                ...state,
                isAuth: false,
                user: null
            }
        default:
            return state
    }
}

export default reducer