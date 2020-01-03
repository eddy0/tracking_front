import React from 'react'
import { Table, Divider, Tag } from 'antd'

const columns = [
    {
        title: 'Todo',
        dataIndex: 'todo',
        key: 'todo',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, todo) => {
            console.log(text, todo)
            return (
                <span>
        <a> {todo.complete === true ? 'x' : '!'}</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </span>
            )
        },
    },
]


const TodoList = ({todos}) => {
    return (
        <div className='todo-list container'>
            <Table columns={columns} dataSource={Object.values(todos)}/>
        </div>
    )
}


export default TodoList