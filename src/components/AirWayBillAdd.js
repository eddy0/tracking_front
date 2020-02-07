import React from 'react'
import {Form, Input, Button} from 'antd'
import {useDispatch} from 'react-redux'
import {handleAddAWB} from '../actions/awbAction'


const AirWayBillAdd = (props) => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.form.validateFields((err, value) => {
            if (!err) {
                if (value.note === undefined) {
                    value.note = 'N/A'
                }
                dispatch(handleAddAWB(value))
                props.form.resetFields()
                props.history.push('/awb')
            }
        })
    }

    const valid = (value) => {
        const pattern = /\d{3}-\d{8}/
        return value.match(pattern)
    }

    const awbRules = (rule, value, callback) => {
        const { form } = props
        console.log(value, form.validateFields)

        if (value.length === 12 && valid(value) ) {
            callback()
        } else {
            callback('format: XXX-XXXXXXXX')
        }

    }



    const {getFieldDecorator} = props.form

    return (
        <Form className='todo-add-box' onSubmit={handleSubmit}>
            <Form.Item hasFeedback>
                {getFieldDecorator('awb', {
                    rules: [
                        {required: true, message: 'Please input your awb!'},
                        {
                            validator: awbRules,
                        },
                    ],
                })(
                    <Input placeholder="awb"/>
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

export default Form.create({name: 'TodoAdd'})(AirWayBillAdd)