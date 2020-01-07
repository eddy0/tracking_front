import React from 'react'
import {Table, Divider, Button, Menu, Breadcrumb} from 'antd'
import { NavLink} from "react-router-dom";


const activeStyle = {
    color: '#ff0000'
}

const TodoList = ({todos, handleToggleTodo, handleDeleteTodo}) => {

    const columns = [
        {
            title: 'Todo',
            dataIndex: 'todo',
            key: 'todo',
            render: text => <input value={text} disabled={true} />,
        },
        {
            title: 'Note',
            dataIndex: 'lastNote',
            key: 'lastNote',
        },
        {
            title: 'time',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, todo) => {
                return (
                    <span>
                    <Button onClick={() => handleToggleTodo(todo)} size={"small"}
                            type={todo.complete === true ? 'default' : 'primary'}>{todo.complete === true ? 'undo' : 'done'}</Button>
                    <Divider type="vertical"/>
                    <Button onClick={() => handleDeleteTodo(todo)} size={"small"} type={'dashed'}>Delete</Button>
                </span>
                )
            },
        },
    ]

    return (
        <div className='todo-list container'>
            <Breadcrumb style={{marginBottom: '20px'}}>
                <Breadcrumb.Item>
                    <NavLink to={'/todo/uncomplete'} activeStyle={activeStyle}>
                        Uncomplete
                    </NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={'/todo/complete'} activeStyle={activeStyle}>
                        Completed
                    </NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to={'/todo'} exact activeStyle={activeStyle}>
                        All
                    </NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Table columns={columns} align={'center'} pagination={false} dataSource={todos}/>
        </div>
    )
}


export default TodoList