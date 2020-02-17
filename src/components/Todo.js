import React from 'react'
import {Table, Button} from 'antd'
import {Link} from 'react-router-dom'
import TableCta from './TableCTA'
import {connect} from 'react-redux'
import {handleFetchTodos, handleUpdateTodo} from '../actions/todoAction'
import {now} from '../utils'
import {EditableCell, EditableFormRow} from './TableCompoenent'



class Todo extends React.Component {

    columns = [
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
            render: (text, record) => <span>{now(record.updatedTime)}</span>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 'max-content',
            render: (text, record) => <TableCta record={record} {...this.props} />
        },
    ]


    componentDidMount() {
        if (this.props.dataSource.length === 0) {
            this.props.handleFetchTodos((r) => {
                console.log('callback')
                this.props.history.push('/login')

            })
        }
    }


    update = ({target, ...todo}) => {
        this.props.handleUpdateTodo(target, todo)
    }


    addKey = (data) => {
        return data.map((d) => {
            return {...d, key: d.id}
        })
    }


    render() {
        let dataSource = this.props.dataSource
        dataSource = this.addKey(dataSource)
        console.log(dataSource)

        const pathname = this.props.history.location.pathname
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
        const columns = this.columns.map(col => {
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
                    <Link to='/todo/add'>
                        Add a new todo
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

export default connect(mapStateToProps, mapDispatchToProps)(Todo)