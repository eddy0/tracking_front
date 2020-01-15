import React from 'react'
import {Button, Divider, Modal, Popconfirm} from 'antd'
import Memo from "./Memo";


class Ctadetails extends React.Component {
    state = {
        visible: false,
        loading: false,
        comments: this.props.todo || [],
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 100);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const todo = this.props.todo
        const {visible, loading} = this.state;

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
                            <p>{todo.lastNote}</p>
                            <Memo id={todo.id} comments={todo.note}/>
                        </div>
                    }
                </Modal>
            </>
        )
    }

    // <Button
    //     onClick = {()
    // =>
    //     Modal.info({
    //         title: todo.todo,
    //         content: (
    //             <div>
    //                 <p>{todo.lastNote}</p>
    //                 <Memo id={todo.id} comments={todo.note}/>
    //             </div>
    //         ),
    //         onOk() {
    //
    //         },
    //     })
    // }>
    //     details </Button>


}


const TableCta = (props) => {
    const {record, handleDelete, handleToggleTodo} = props
    const todo = record
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Ctadetails todo={todo}/>
            <Divider type="vertical"/>
            <Button onClick={() => handleToggleTodo(todo.id)} type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>

        </div>
    )
}

export default TableCta