import React from 'react'
import {Modal} from 'antd'


function info(title, messages) {
    Modal.info({
        title: 'This is a notification message',
        content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        ),
        onOk() {
        },
    })
}

function success(content) {
    Modal.success({
        content: content,
    })
}

export function error(title, content) {
    Modal.error({
        title: title,
        content: content,
    })
}

function warning() {
    Modal.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...',
    })
}
