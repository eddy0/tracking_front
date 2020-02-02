import {
    addAwbs,
    deleteAwb,
    getAwbs,
    toggleAwb,
    updateAwb,
} from '../utils'


const FETCH_AWB = 'FETCH_AWB'
const CREATE_AWB = 'CREATE_AWB'
const TOGGLE_AWB = 'TOGGLE_AWB'
const DELETE_AWB = 'DELETE_AWB'
const UPDATE_AWB = 'UPDATE_AWB'
const SAVE_AWB = 'SAVE_AWB'

const actionFetchAWB = (awb) => {
    return {
        type: FETCH_AWB,
        awbs: awb
    }
}

const handleFetchAWB = () => {
    return (dispatch) => {
        getAwbs().then((awb) => {
            dispatch(actionFetchAWB(awb))
        })
    }
}

const actionAddAWB = (awb) => {
    return {
        type: CREATE_AWB,
        awb: awb
    }
}

const handleAddAWB = (form) => (dispatch) => {
    addAwbs(form).then((t) => {
        dispatch(actionAddAWB(t))
    })
}

const actionHandleToggleAWB = (id) => {
    return {
        type: TOGGLE_AWB,
        id: id
    }
}

const handleToggleAWB = (id) => (dispach) => {
    return toggleAwb(id).then((r) => {
        console.log('action awb', r)
        dispach(actionHandleToggleAWB(id))
    })
}


const actionDeleteAWB = (id) => {
    return {
        type: DELETE_AWB,
        id: id
    }
}

const handleDeleteAWB = (id) => (dispatch) => {
    return deleteAwb(id).then((r) => {
        console.log(r)
        dispatch(actionDeleteAWB(id))
    })
}

const actionUpdateAWB = (target, awb) => {
    return {
        type: UPDATE_AWB,
        target,
        awb,
    }
}


const handleUpdateAWB = (target, awb) => (dispatch) => {
    return updateAwb(awb.id, {[target]: awb[target]}).then((r) => {
        dispatch(actionUpdateAWB(target, awb))
    })
}


export {
    FETCH_AWB,
    CREATE_AWB,
    DELETE_AWB,
    UPDATE_AWB,
    TOGGLE_AWB,
    SAVE_AWB,
    handleFetchAWB,
    handleToggleAWB,
    handleDeleteAWB,
    handleUpdateAWB,
    handleAddAWB,
}