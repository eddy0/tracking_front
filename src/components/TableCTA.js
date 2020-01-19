import React from 'react'
import {Button, Divider, Popconfirm} from 'antd'
import {useDispatch} from "react-redux";
import {handleDeleteTodo, handleToggleTodo} from "../actions/todoAction";
import CtaDetails from './CtaDetails'




const TableCta = (props) => {
    const dispatch = useDispatch()
    const {record} = props
    const todo = record
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <CtaDetails todo={todo}/>
            <Divider type="vertical"/>
            <Button onClick={() => dispatch(handleToggleTodo(todo.id))} type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => dispatch(handleDeleteTodo(record.key))}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>

        </div>
    )
}

export default TableCta