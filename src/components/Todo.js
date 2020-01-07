import React from 'react';
import {Table, Input, Button, Popconfirm, Form, Modal} from 'antd'
import {Link} from 'react-router-dom'
import TableCta from './TableCTA'
import {getTodos} from "../utils";

const EditableContext = React.createContext()

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing
        this.setState({editing}, () => {
            if (editing) {
                this.input.focus()
            }
        })
    }

    save = e => {
        const {record, handleSave} = this.props
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return
            }
            this.toggleEdit()
            handleSave({...record, ...values})
        })
    }

    renderCell = form => {
        this.form = form
        const {children, dataIndex, record, title} = this.props
        const {editing} = this.state
        return editing ? (
            <Form.Item style={{margin: 0}}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{paddingRight: 24}}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        )
    }

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        )
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource:[],
            count: 0,
        }

        this.columns = [
            {
                title: 'Todo',
                dataIndex: 'todo',
                key: 'todo',
                editable: true,
            },
            {
                title: 'Note',
                dataIndex: 'lastNote',
                key: 'lastNote',
                editable: true,
            },
            {
                title: 'Time',
                dataIndex: 'updatedTime',
                key: 'updatedTime',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => <TableCta record={record} handleToggleTodo={this.handleToggleTodo}
                                                    handleDelete={this.handleDelete} {...props} />
            },
        ]
    }

    componentDidMount() {
        const todos = getTodos()
        this.setState({dataSource: todos, count: todos.length})
    }


    handleDelete = key => {
        const dataSource = [...this.state.dataSource]
        this.setState({dataSource: dataSource.filter(item => item.key !== key)})
    }


    handleToggleTodo = (todo) => {
        this.state.dataSource.map((t) => {
            if (t.id === todo.id) {
                return {...t, complete: !t.complete}
            } else {
                return t
            }
        })
    }

    handleDeleteTodo = (todo) => {
        this.state.dataSource.filter((t) => {
            return t.id !== todo.id
        })
    }

    handleTodoUpdate = (todo) => {
        this.state.dataSource.map((t) => {
            if (t.id === todo.id) {
                return {...t, todo: todo.todo}
            } else {
                return t
            }
        })
    }


    handleSave = (todo, e) => {
        console.log(todo, e.target)
        let newData = [...this.state.dataSource]
        newData = newData.map((t) => {
            if (t.id === todo.id) {
                return {...t, todo: todo.todo}
            } else {
                return t
            }
        })
        this.setState({dataSource: newData})
    }

    render() {
        const {dataSource} = this.state
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
                onCell: (record, index, ...rest) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: () => this.handleSave(record,index, rest ),
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

export default Todo;