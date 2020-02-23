import React from 'react'
import {Form, Input, Button} from 'antd'
import {useDispatch} from 'react-redux'
import {handleAddTodo} from '../../src/actions/todoAction'
import {useRouter} from 'next/router'


const TodoAdd = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.form.validateFields((err, value) => {
            if (!err) {
                if (value.note === undefined) {
                    value.note = 'N/A'
                }
                dispatch(handleAddTodo(value))
                props.form.resetFields()
                router.push('/')
            }
        })
    }

    const {getFieldDecorator} = props.form

    return (
        <Form className='todo-add-box' onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator('todo', {
                    rules: [{required: true, message: 'Please input your todo!'}],
                })(
                    <Input placeholder="todo"/>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('note')(
                    <Input placeholder="note"/>
                )}
            </Form.Item>
            <Button type='primary' htmlType='submit'>Add</Button>
        </Form>
    )
}

export default Form.create({name: 'TodoAdd'})(TodoAdd)