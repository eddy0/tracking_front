import React from 'react'
import {Button, Divider, Popconfirm} from 'antd'
import {useDispatch} from "react-redux";
import {handleDeleteTodo, handleToggleTodo} from "../actions/todoAction";
import CtaDetails from './CtaDetails'


/*
air china
<form action="http://www.airchinacargo.com/en/search_order.php" method="post" class="jq-multi-form-185" name="trackform"
      target="_top">
    <input type="hidden" name="orders10" id="orders10" value="999">
    <input type="hidden" name="orders0" id="orders0" value="74472252">
    <input type="hidden" name="orders9" id="orders9" value="78oi">
    <input type="hidden" name="section" id="section" value="0-0001-0003-0081">
    <input id="add1" type="submit" value="ok" class="gua-button">

</form>

 */

const AWBAction = (props) => {
    const dispatch = useDispatch()
    const {record} = props
    const todo = record

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Button type={'primary'} htmlType={'button'} >
                <a target='_blank' href="https://cargo.ana.co.jp/anaicoportal/portal/trackshipments?trkTxnValue=205-84489215">
                    click
                </a>

            </Button>
            <Divider type="vertical"/>
            <Button onClick={() => dispatch(handleToggleTodo(todo.id))} type={todo.complete === true ? 'default' : 'primary'}>
                {todo.complete === true ? 'undo' : 'done'}
            </Button>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => dispatch(handleDeleteTodo(record.key))}>
                <Button type={'dashed'}>Delete</Button>
            </Popconfirm>

        </div>
    )
}

export default AWBAction