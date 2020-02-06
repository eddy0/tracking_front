import React from 'react'
import {Button, Divider, Popconfirm} from 'antd'
import {useDispatch} from 'react-redux'
import {handleDeleteTodo, handleToggleTodo} from '../actions/todoAction'
import CtaDetails from './CtaDetails'
import {parse_awb} from '../config_awb'


const AWBAction = (props) => {
    const dispatch = useDispatch()
    const {record} = props
    const todo = record

    const prefix = todo.awb.slice(0, 3)
    const body = todo.awb.slice(-8)
    let component = parse_awb(prefix, body)

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            {
                component !== undefined &&
                component
            }
            <Divider type="vertical"/>
            <Button onClick={() => dispatch(handleToggleTodo(todo.id))}
                    type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => dispatch(handleDeleteTodo(record.key))}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>
        </div>
    )
}

export default AWBAction