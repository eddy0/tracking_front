import {Comment, Avatar, Form, Button, List, Input} from 'antd'
import moment from 'moment'
import React, {useState} from 'react'
import {ReplyApi} from '../api/api'

const {TextArea} = Input


const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea placeholder={'add comment'} rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
)

const ReplyNew = function ({comment, submitting, handleChange, handleSubmit}) {
    return (
        <>
            <Editor

                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={comment}
            />
        </>
    )
}

export default ReplyNew