import {Button, Table} from 'antd'
import React from 'react'
import {now} from '../../src/utils'
import TableCta from '../../src/components/TableCTA'
import {EditableCell, EditableFormRow} from '../../src/components/TableCompoenent'
import {handleFetchTodos, handleUpdateTodo} from '../../src/actions/todoAction'
import {connect, useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import Link from 'next/link'


const Todo = function () {

    let dataSource = useSelector((state) => state.todos)
    const count = dataSource.length
    const dispatch = useDispatch()
    let columns = [
        {
            title: 'Todo',
            dataIndex: 'todo',
            key: 'todo',
            editable: true,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            editable: true,
        },
        {
            title: 'Time',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
            width: '140px',
            render: (text, record) => <span>{now(record.updatedTime * 1000)}</span>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 'max-content',
            render: (text, record) => <TableCta record={record} {...this.props} />
        },
    ]
    const router = useRouter()

    React.useEffect(() => {
        if (count === 0) {
            dispatch(handleFetchTodos(r => {
                router.push('/login')
            }))
        }
    })


    const update = ({target, ...todo}) => {
        dispatch(handleUpdateTodo(target, todo))
    }


    const addKey = (data) => {
        return data.map((d) => {
            return {...d, key: d.id}
        })
    }


    dataSource = addKey(dataSource)
    console.log(dataSource)

    const pathname = router.pathname
    if (pathname === '/todo/complete') {
        dataSource = dataSource.filter(d => d.complete === true)
    } else if (pathname === '/todo/uncomplete') {
        dataSource = dataSource.filter(d => d.complete === false)
    }

    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    }

    columns = columns.map(col => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.update,
            }),
        }
    })
    return (
        <div>
            <Button type="primary" style={{marginBottom: 16}}>
                <Link href='/todo/add'>
                    <a>
                        Add a new todo
                    </a>
                </Link>
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    const todos = state.todos
    return {
        dataSource: todos,
        count: todos.length
    }
}

const mapDispatchToProps = ({
    handleFetchTodos,
    handleUpdateTodo,
})

// export default connect(mapStateToProps, mapDispatchToProps)(Todo)

export default Todo