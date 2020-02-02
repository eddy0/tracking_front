import React from 'react'
import {Table, Button} from 'antd'
import {Link} from 'react-router-dom'
import TableCta from './TableCTA'
import {connect} from 'react-redux'
import {log, now} from '../utils'
import {EditableCell, EditableFormRow} from './TableCompoenent'
import {handleFetchAWB, handleUpdateAWB} from '../actions/awbAction'
import AWBAction from './AWBAction'


class AWB extends React.Component {

    columns = [
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
            render: (text, record) => <AWBAction record={record} {...this.props} />
        },
    ]


    componentDidMount() {
        if (this.props.dataSource.length === 0) {
            this.props.handleFetchAWB()
        }
    }


    update = ({target, ...todo}) => {
        this.props.handleUpdateAWB(target, todo)
    }


    addKey = (data) => {
        return data.map((d) => {
            return {...d, key: d.id}
        })
    }


    render() {
        let dataSource = this.props.dataSource
        dataSource = this.addKey(dataSource)

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        }

        const columns = this.columns.map(col => {
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
                    handleSave: this.update,
                }),
            }
        })
        return (
            <div>
                <Button type="primary" style={{marginBottom: 16}}>
                    <Link to='/awb/add'>
                        Add a new awb
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
}

const mapStateToProps = (state) => {
    const awbs = state.awbs
    return {
        dataSource: awbs,
        count: awbs.length
    }
}

const mapDispatchToProps = ({
    handleFetchAWB,
    handleUpdateAWB,
})

export default connect(mapStateToProps, mapDispatchToProps)(AWB)