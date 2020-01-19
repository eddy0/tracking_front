import React from 'react'
import {Button, Modal} from 'antd'
import Memo from './Memo'


class Ctadetails extends React.Component {
    state = {
        visible: false,
        loading: false,
        comments: this.props.todo || [],
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            })
        }, 100)
    }

    handleCancel = () => {
        console.log('Clicked cancel button')
        this.setState({
            visible: false,
        })
    }

    render() {
        const todo = this.props.todo
        const {visible, loading} = this.state

        return (
            <>
                <Button onClick={this.showModal}>details</Button>
                <Modal
                    title={todo.todo}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={loading}
                    onCancel={this.handleCancel}
                >
                    {
                        <div>
                            <p>{todo.note}</p>
                            <Memo id={todo.id} comments={todo.comments}/>
                        </div>
                    }
                </Modal>
            </>
        )
    }
}

export default Ctadetails