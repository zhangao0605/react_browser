import React, {Component} from 'react'
import {$http} from '../../services/http'
import utils from '../../utils/index'
import intl from 'react-intl-universal'
import store from '../../store/index'
import './index.css'
import {Collapse, Icon} from 'antd'
import {connect} from 'react-redux'
import {search_blockheight} from "../../store/actions/addAction"

const {Panel} = Collapse


export class single_block_details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_arr: {},
        }
    }

    getdata(data) {
        $http.post(this, {
            url: "/chain/getBlockDataByPage",
            dataType: "json",
            data: data,
            success: function (res) {
                if (res.code === 200) {
                    this.props.dispatch(search_blockheight(res.data.dataList[0]))
                    this.setState({
                        table_arr: res.data.dataList[0],
                    })

                } else {

                }

            },
        })
    }

    componentDidMount() {
        let data = store.getState().communication.search_blockheight
        let send_data = {
            "height": data.height.toString(),
            "chainId": data.chainId.toString(),
            "page": 1,
            "pagesize": 10,
            "hash": data.hash
        }
        this.getdata(send_data)

    }

    prv() {
        let data = this.props.store_data
        if (Number(data.height) >= 1) {
            let send_data = {
                "height": (Number(data.height) - 1).toString(),
                "chainId": data.chainId.toString(),
                "page": 1,
                "pagesize": 10,
                "hash": ''
            }
            this.getdata(send_data)
        } else {
            this.$message.error('区块高度不能为0')
        }

    }

    next() {
        let data = this.props.store_data

        let send_data = {
            "height": (Number(data.height) + 1).toString(),
            "chainId": data.chainId.toString(),
            "page": 1,
            "pagesize": 10,
            "hash": ''
        }
        this.getdata(send_data)

    }

    render() {
        return (
            <div className='single_con'>
                <Collapse defaultActiveKey={['1', '2', '3', '4', '5',]}>
                    <Panel header={intl.get('block_height')} key="1">
                        <span>{this.state.table_arr.height}</span>
                        <span onClick={() => {
                            this.prv()
                        }} style={{marginLeft: 50}} className='chnage_icons'><Icon type="step-backward"/></span>
                        <span onClick={() => {
                            this.next()
                        }} style={{marginLeft: 30}} className='chnage_icons'><Icon type="step-forward"/></span>

                    </Panel>
                    <Panel header={intl.get('chainId')} key="2">
                        <p>{this.state.table_arr.chainId}</p>
                    </Panel>
                    <Panel header={intl.get('timestamp')} key="3">
                        <p>{utils.timestampToTime(this.state.table_arr.timeTamp)}</p>
                    </Panel>
                    <Panel header="Hash" key="4">
                        <p>{this.state.table_arr.hash}</p>
                    </Panel>
                    <Panel header={intl.get('parent_block_hash')} key="5">
                        <p>{this.state.table_arr.previousHash}</p>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        store_data: store.communication.search_blockheight
    }
}

export default connect(mapStateToProps)(single_block_details)