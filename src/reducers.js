import {save} from './utils'


const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            save(action.payload)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

export default reducer