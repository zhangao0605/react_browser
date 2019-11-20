import React, {Component} from 'react'
import {connect} from "react-redux"
import {$http} from '../../services/http'
import utils from "../../utils"
import intl from 'react-intl-universal'
import {Table} from 'antd'
import './index.css'
import {search_blockheight} from "../../store/actions/addAction"

export class block_details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_arr: []
        }
    }

    componentDidMount() {
        let data = {"height":this.props.parames_id, "chainId": "", "page": 1, "pagesize": 10, "hash": ""}
        $http.post(this, {
            url: "/chain/getBlockDataByPage",
            dataType: "json",
            data: data,
            success: function (res) {
                this.setState({table_arr: res.data.dataList})
            },
        })
    }
    /*根据区块hash/高度/id跳转区块详情*/
    to_height_de(e){
        this.props.dispatch(search_blockheight(e))
        this.props.history.push('/single_block_details')
    }

    render() {
        const columns = [
            {
                title: intl.get('chainId'),
                dataIndex: 'chainId',
                align: 'center',
                render: text => <span>{text}</span>,
            },
            {
                title: intl.get('block_hash'),
                dataIndex: 'hash',
                align: 'center',
                render: (value, scope)  => <span className='is_choose' onClick={()=>{this.to_height_de(scope)}}>{value}</span>,
            },
            {
                title: intl.get('timestamp'),
                dataIndex: 'timeTamp',
                align: 'center',
                render: value => <span>{utils.timestampToTime(value)}</span>
            },
            {
                title: intl.get('trading_volume'),
                dataIndex: 'txcount',
                align: 'center'
            },
        ]
        return (
            <div className='block_details_con'>
                <div className='block_details_header'>
                    {intl.get('blockchain_details')}
                </div>
                <div className='block_details_header'>
                    {intl.get('block_height')}# {this.props.parames_id}
                </div>
                <Table  style={{marginTop:30}} columns={columns} dataSource={this.state.table_arr} rowKey={row => row.hash}>

                </Table>
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