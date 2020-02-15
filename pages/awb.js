import React from 'react'
import {Table, Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import Link from 'next/link'
import {EditableCell, EditableFormRow} from '../src/components/TableCompoenent'
import {handleFetchAWB, handleUpdateAWB} from '../src/actions/awbAction'
import AWBAction from '../src/components/AWBAction'
import {now} from '../src/utils'


const AWB = (props) =>  {
    let dataSource = useSelector((state) => state.awbs)
    const count = dataSource.length
    const dispatch = useDispatch()

    let columns = [
        {
            title: 'AWB',
            dataIndex: 'awb',
            key: 'awb',
            editable: true,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            editable: true,
        },
        {
            title: 'Time',
            dataIndex: 'updatedTime',
            key: 'updatedTime',
            width: '140px',
            render: (text, record) => <span>{now(record.updatedTime * 1000)}</span>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 'max-content',
            render: (text, record) => <AWBAction record={record} {...props} />
        },
    ]

    React.useEffect(() => {
        if (count === 0) {
            dispatch(handleFetchAWB())
        }
    }, [])


    const update = ({target, ...todo}) => {
        dispatch(handleUpdateAWB(target, todo))
    }


    const addKey = (data) => {
        return data.map((d) => {
            return {...d, key: d.id}
        })
    }


    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    }

    columns = columns.map(col => {
            if (!col.editable) {
                return col
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: update,
                }),
            }
        })

    dataSource = addKey(dataSource)

    return (
            <div>
                <Button type="primary" style={{marginBottom: 16}}>
                    <Link href='/awb/add'>
                        <a>

                        Add a new awb
                        </a>
                    </Link>
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        )
}

export default AWB

