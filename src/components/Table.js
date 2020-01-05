import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import TableCta from './TableCTA'

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

class EditableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: this.props.todos,
            count: this.props.todos.length,
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
                dataIndex: 'note',
                key: 'note',
            },
            {
                title: 'time',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => <TableCta record={record} handleDelete={this.handleDelete} {...props} />
            },
        ]
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource]
        this.setState({dataSource: dataSource.filter(item => item.key !== key)})
    }

    // handleAdd = () => {
    //     const {count, dataSource} = this.state
    //     const newData = {
    //         key: count,
    //         name: `Edward King ${count}`,
    //         age: 32,
    //         address: `London, Park Lane no. ${count}`,
    //     }
    //     this.setState({
    //         dataSource: [...dataSource, newData],
    //         count: count + 1,
    //     })
    // }

    handleSave = todo => {
        let newData = [...this.state.dataSource]
        newData = newData.map((t) => {
            if (t.id === todo.id) {
                return {...t, todo: todo.todo}
            } else {
                return t
            }
        })
        this.setState({dataSource: newData})
        this.props.handleTodoUpdate(todo)
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
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
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

export default EditableTable