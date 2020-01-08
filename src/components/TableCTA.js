import React from 'react'
import {Button, Divider, Modal, Popconfirm} from 'antd'
import {Comment, Avatar, Form, List, Input} from 'antd'
import moment from 'moment'
import {saveComments} from "../utils";

const {TextArea} = Input

const CommentList = ({comments}) => {

    // comments = comments.map((comment) => {
    //     return {
    //         ...comment,
    //         content: `<p>${comment.content}</p>`,
    //     }
    // })
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    )
}

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
)

class Note extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    }

    componentDidMount() {
        const comments = this.props.comments || []
        console.log('c',comments)
        this.setState({
            comments: comments,
            submitting: false,
            value: '',
        })
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return
        }

        this.setState({
            submitting: true,
        })

        const c = {
            content: this.state.value,
            datetime: Date.now(),
        }
        const id = this.props.id

        const comments = [...this.state.comments, c]

        saveComments(comments, id).then(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        content: this.state.value,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            })
        })


    }


    handleChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    render() {
        const {comments, submitting, value} = this.state
        return (
            <div>
                {comments.length > 0 && <CommentList comments={comments}/>}
                <Comment
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        )
    }
}


const TableCta = (props) => {
    const {record, handleDelete, handleToggleTodo} = props
    const todo = record
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Button onClick={() => Modal.info({
                title: record.todo,
                content: (
                    <div>
                        <p>{record.note}</p>
                        <Note id={record.id} comments={record.note}/>
                    </div>
                ),
                onOk() {
                },
            })}>details</Button>
            <Divider type="vertical"/>
            <Button onClick={() => handleToggleTodo(todo.id)}
                    type={todo.complete === true ? 'default' : 'primary'}>{todo.complete === true ? 'undo' : 'done'}</Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>

        </div>
    )
}

export default TableCta