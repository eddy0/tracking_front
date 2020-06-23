import React, {useContext, useEffect, useState} from 'react'
import _css from'./TopicNew.module.css'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css'
import {useFormik} from 'formik'
import {Select} from 'antd'
import {Radio} from 'antd'
import {log} from '../utils'
import {RootContext} from '../App'
import {TopicApi} from '../api/api'
import {useHistory} from 'react-router'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length < 3) {
        errors.title = 'Must be more than 3 charactor'
    }

    if (!values.text) {
        errors.text = 'Required'
    } else if (values.text.length < 3) {
        errors.text = 'Must be more than 3'
    }

    if (!values.text) {
        errors.text = 'Required'
    } else if (values.text.length < 3) {
        errors.text = 'Must be more than 3'
    }

    if (!values.board) {
        errors.board = 'Required'
    }

    if (!values.auth) {
        errors.auth = 'Required'
    }

    return errors
}

function TopicNew(props) {
    const {state} = useContext(RootContext)
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            html: '',
            board: 1,
            auth: 1,
        },
        validate,
        onSubmit: values => handleSubmit(values)
    })

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

    const mdParser = new MarkdownIt
    const {Option} = Select

    const handleChange = (value, option) => {
        formik.values.board = value
        log(option)
    }


    return (

        <div className={`${_css.main} main`}>
            <form className={_css['main-container']} onSubmit={formik.handleSubmit}>
                <section className={_css['main-title']}>
                    <input {...formik.getFieldProps('title')} type="text" className={_css['title-content']} name="title"
                           placeholder="Input the Title"/>
                    <div className={_css['tag-content']}>
                        <span className={_css['tag-header']} style={{marginRight: '1rem'}}>Select a Board&nbsp;:</span>
                        <div>
                            <Radio.Group {...formik.getFieldProps('board')} value={formik.values.board}>
                                <Radio value={1}>front-end</Radio>
                                <Radio value={2}>back-end</Radio>
                                <Radio value={3}>note</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className={_css["tag-content"]}>
                        <span className={_css["tag-header" ]} style={{marginRight: '1rem'}}>Authorization&nbsp;:</span>
                        <Radio.Group {...formik.getFieldProps('auth')} value={formik.values.auth}>
                            <Radio value={1}>public</Radio>
                            <Radio value={2}>private</Radio>
                        </Radio.Group>
                    </div>
                </section>
                <section className={_css['main-textarea']}>
                    <MdEditor
                        className={_css['text-container']}
                        htmlClass={_css['text-container']}
                        value={formik.values.text}
                        placeholder='type text here'
                        // style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(html, event) => {
                            formik.values.html = html.html
                            formik.values.text = html.text
                            // formik.handleChange(event)
                        }}
                    />
                </section>
                <div className={_css['footer']}>
                    <button className={`${_css['wd-topic-btn']} ${_css['wd-topic-submit']}`} disabled={!formik.dirty || !formik.isValid}
                            type={'submit'}>Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default TopicNew