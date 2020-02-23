import React from 'react'
import {Button, Divider, Popconfirm} from 'antd'
import {useDispatch} from 'react-redux'
import {handleDeleteTodo} from '../actions/todoAction'
import {parse_awb} from '../config_awb'
import {handleToggleAWB, handleDeleteAWB} from '../actions/awbAction'


const AWBAction = (props) => {
    const dispatch = useDispatch()
    const {record} = props
    const todo = record
    const {awb} = record


    const prefix = awb.slice(0, 3)
    const body = awb.slice(-8)
    let component = parse_awb(prefix, body)

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {
                component !== undefined &&
                component
            }
            <Divider type="vertical"/>
            <Button onClick={() => dispatch(handleToggleAWB(todo.id))}
                    type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => dispatch(handleDeleteAWB(record.key))}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>
        </div>
    )
}

export default AWBAction