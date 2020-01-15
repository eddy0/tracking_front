import {Button, Comment, Form, Input, List} from "antd";
import moment from "moment";
import React from "react";
import {saveComments} from "../utils";

const {TextArea} = Input

const CommentList = ({comments}) => {
    comments = comments.map((c) => {
        c.datetime = moment(c).fromNow()
        return c
    })
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

class Memo extends React.Component {
    state = {

        submitting: false,
        value: '',
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
            this.setState((prev) => {
                return {
                    submitting: false,
                    value: '',
                    comments: [...prev.comments, c],
                }
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


export default Memo