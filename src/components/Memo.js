import {Button, Comment, Form, Input, List} from 'antd'
import moment from 'moment'
import React from 'react'
import {saveComments} from '../utils'
import {useDispatch, useSelector} from 'react-redux'
import {handleUpdateComment} from '../actions/todoAction'


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

const Memo = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [value, setValue] = React.useState('')
    const dispatch = useDispatch()
    const todo = useSelector(state => state.todos.filter((t) => t.id === props.id))

    const handleSubmit = () => {
        if (!value) {
            return
        }

        setLoading(true)

        const c = {
            content: value,
            time: Date.now(),
        }
        const id = props.id

        console.log(c)

        dispatch(handleUpdateComment(c, id))

        setLoading(false)
        setValue('')
    }


    const comments = todo[0].comments

    return (
        <div>
            {comments.length > 0 && <CommentList comments={comments}/>}
            <Comment
                content={
                    <Editor
                        onChange={(e) => setValue(e.target.value)}
                        onSubmit={handleSubmit}
                        submitting={loading}
                        value={value}
                    />
                }
            />
        </div>
    )
}


export default Memo