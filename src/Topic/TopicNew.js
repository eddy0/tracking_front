import React, {useContext, useEffect, useState} from 'react'
import _css from './TopicNew.module.css'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css'
import {Button, Col, Form, Input, Row, Select} from 'antd'
import {Radio} from 'antd'
import {log} from '../utils'
import {RootContext} from '../App'
import {TopicApi} from '../api/api'
import {useHistory} from 'react-router'


function TopicNew(props) {
    const {state} = useContext(RootContext)
    const history = useHistory()
    const [_form] = Form.useForm()
    const [submit, setSubmit] = useState(true)
    const mdParser = new MarkdownIt()
    const initValues = {
        title: '',
        auth: 1,
        board: 1,
        type: 1,
        content: '',
        text: '',
    }


    // 表单结束
    const onFinish = values => {
        // values.content = formatContent(values.content)
        console.log('Success:', values)
    }

    // 表单校验有错
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const onFieldsChange = (changedFields, allFields) => {
        let title = allFields.filter(f => f.name[0] === 'title')[0]
        let titleTouched = title.touched
        let error = _form.getFieldsError().filter(({errors}) => errors.length).length
        if (error !== 0 || !titleTouched) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }

    const hanldeNormalize = (value, prevValue, prevValues) => {
        log('value normal', value)
        return value.text
    }


    const handleSubmit = (values) => {
        // console.log(values, state.token, state.user.id)
        const {user, token} = state
        log(values, user, state)
        const data = {
            token: token,
            id: user.id,
            data: values
        }

        TopicApi.new(data).then((res) => {
            log(res)
            history.push('/')
        }).catch(err => log(err))
    }


    return (

        <div className={`${_css.main} main`}>
            <Form
                form={_form}
                className={_css['main-container']}
                name="basic"
                initialValues={initValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFieldsChange={onFieldsChange}
            >
                <section className={_css['main-title']}>
                    <Row>
                        <Col span={24}>
                            <Form.Item

                                name="title"
                                rules={[{
                                    required: true, message: 'Title can\'t be emplt'
                                },
                                    {min: 3, message: 'min 3 words'}
                                ]}
                            >
                                <Input size='large' className={_css['title-content']} placeholder='Input Title Here'
                                       autoComplete='off'/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={10}>
                            <Form.Item
                                name="board"
                                label="select a Board"
                                rules={[{required: true, message: 'choose a board!'}]}
                            >
                                <Select placeholder="add a type">
                                    <Select.Option value={1}>Frond End</Select.Option>
                                    <Select.Option value={2}>Back End</Select.Option>
                                    <Select.Option value={3}>note</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={10}>
                            <Form.Item
                                name="type"
                                label="select a Type"
                                rules={[{required: true, message: 'choose a type!'}]}
                            >
                                <Select placeholder="add a type">
                                    <Select.Option value={1}>原创</Select.Option>
                                    <Select.Option value={2}>转载</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={10}>
                            <Form.Item
                                name="auth"
                                label="Authorization"
                                rules={[{required: true, message: 'add a type!'}]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>public</Radio>
                                    <Radio value={2}>privat</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </section>

                <section className={_css['main-textarea']}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name={'content'}
                                normalize={hanldeNormalize}
                                rules={[{required: true}, {min: 10, message: 'must be at least 10 characters'}]}
                            >
                                <MdEditor
                                    className={_css['text-container']}


                                    config={{
                                        syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                                    }}

                                    placeholder='type text here'
                                    style={{height: '500px'}}
                                    renderHTML={(text) => mdParser.render(text)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </section>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button size='large'
                                    style={{
                                        width: '100%',
                                    }}
                                    type="primary"
                                    disabled={submit}
                                    htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}


export default TopicNew


