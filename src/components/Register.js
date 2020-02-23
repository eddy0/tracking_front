import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Row,
    Col,
    Button,
} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import {handleRegister} from '../actions/userAction'
import {connect} from 'react-redux'


const {Option} = Select


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values, this.props)
                this.props.handleRegister(values, () => {
                    console.log(this.props)
                    this.props.history.push('/todo')
                })

            }
        })
    }

    handleConfirmBlur = e => {
        const {value} = e.target
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    }

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true})
        }
        callback()
    }


    render() {
        const {getFieldDecorator} = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="username">
                    {getFieldDecorator('username', {
                        rules: [

                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                    }>
                    {getFieldDecorator('nickname', {
                        rules: [{required: false, message: 'Please input your nickname!', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: false,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{required: false, message: 'Please input your phone number!'}],
                    })(<Input style={{width: '100%'}}/>)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    already has account? <Link to='/login'>login now!</Link>
                </Form.Item>
                {/*<Form.Item label="Captcha" extra="We must make sure that your are a human.">*/}
                {/*    <Row gutter={8}>*/}
                {/*        <Col span={12}>*/}
                {/*            {getFieldDecorator('captcha', {*/}
                {/*                rules: [{required: true, message: 'Please input the captcha you got!'}],*/}
                {/*            })(<Input/>)}*/}
                {/*        </Col>*/}
                {/*        <Col span={12}>*/}
                {/*            <Button>Get captcha</Button>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Form.Item>*/}


            </Form>
        )
    }
}


const Register = Form.create({name: 'register'})(RegistrationForm)

export default connect(null, {handleRegister})(Register)