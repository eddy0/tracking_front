import React from 'react'
import {Button, Divider, Modal, Popconfirm} from 'antd'
import Memo from "./Memo";


const Ctadetails = ({todo}) => {
    return (
        <Button onClick={() => Modal.info({
            title: todo.todo,
            content: (
                <div>
                    <p>{todo.lastNote}</p>
                    <Memo id={todo.id} comments={todo.note}/>
                </div>
            ),
            onOk() {
            },
        })}>details</Button>
    )
}


const TableCta = (props) => {
    const {record, handleDelete, handleToggleTodo} = props
    const todo = record
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Ctadetails todo={todo}/>
            <Divider type="vertical"/>
            <Button onClick={() => handleToggleTodo(todo.id)} type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>

        </div>
    )
}

export default TableCta