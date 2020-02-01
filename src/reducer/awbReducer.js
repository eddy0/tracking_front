import createReducer from './helper'
import {
    CREATE_AWB,
    DELETE_AWB,
    FETCH_AWB,
    SAVE_AWB,
    TOGGLE_AWB,
    UPDATE_AWB
} from '../actions/awbAction'


const fetchAWBReducer = (state, action) => {
    return [...action.awbs]
}


const createAWBReducer = (state, action) => {
    return [...state, action.awb]
}


const deleteAWBReducer = (state, action) => {
    return state.filter((e) => e.id !== action.id)
}


const toggleAWBReducer = (state, action) => {
    return state.map((awb) => {
        if (awb.id === action.id) {
            return {...awb, complete: !awb.complete, updatedTime: Date.now()}
        } else {
            return awb
        }
    })
}


const updateAWBReducer = (state, action) => {
    return state.map((awb) => {
        if (awb.id === action.awb.id) {
            return {...awb, [action.target]: action.awb[action.target], updatedTime: Date.now()}
        } else {
            return awb
        }
    })
}


const saveAWBReducer = (state, action) => {
    return state.awbs
}


export default createReducer([], {
    [FETCH_AWB]: fetchAWBReducer,
    [CREATE_AWB]: createAWBReducer,
    [DELETE_AWB]: deleteAWBReducer,
    [UPDATE_AWB]: updateAWBReducer,
    [TOGGLE_AWB]: toggleAWBReducer,
    [SAVE_AWB]: saveAWBReducer,
})