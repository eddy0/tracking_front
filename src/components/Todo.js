import React from 'react';
import {Table, Input, Button, Form} from 'antd'
import {Link} from 'react-router-dom'
import TableCta from './TableCTA'
import {connect} from "react-redux";
import {handleFetchTodos, handleUpdateTodo} from "../actions/todoAction";
import {now} from '../utils'


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
        const target = e.target.id
        const {record, handleSave} = this.props
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return
            }
            this.toggleEdit()
            handleSave({target, ...record, ...values})
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
            this.props.handleFetchTodos()
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

export default connect(mapStateToProps, mapDispatchToProps)(Todo);