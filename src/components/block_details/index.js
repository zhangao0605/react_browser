import React, {Component} from 'react'
import {connect} from "react-redux"
import {$http} from '../../services/http'
import utils from "../../utils"
import intl from 'react-intl-universal'
import {Table} from 'antd'
import './index.css'

export class block_details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_arr: []
        }
    }

    componentDidMount() {
        console.log(this.props.parames_id)
        let data = {"height": "10", "chainId": "", "page": 1, "pagesize": 10, "hash": ""}
        $http.post(this, {
            url: "/chain/getBlockDataByPage",
            dataType: "json",
            data: data,
            success: function (res) {
                this.setState({table_arr: res.data.dataList})
            },
        })
    }

    render() {
        const columns = [
            {
                title: intl.get('file_name'),
                dataIndex: 'chainId',
                align: 'center',
                render: text => <span>{text}</span>,
            },
            {
                title: intl.get('file_create_Time'),
                dataIndex: 'hash',
                align: 'center',
                render: text => <span>{text}</span>,
            },
            {
                title: intl.get('file_size'),
                dataIndex: 'timeTamp',
                align: 'center',
                render: value => <span>{utils.timestampToTime(value)}</span>
            },
            {
                title: intl.get('file_version'),
                dataIndex: 'txcount',
                align: 'center'
            },
        ]
        return (
            <div className='block_details_con'>
                <Table columns={columns} dataSource={this.state.table_arr} rowKey={row => row.hash}></Table>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        parames_id: store.communication.home_blockDetails
    }
}

export default connect(mapStateToProps)(block_details)