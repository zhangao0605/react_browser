import React, {Component} from 'react'
import './index.css'
import {Collapse} from 'antd'
import store from '../../store/index'
import {$http} from '../../services/http'
import  utils from '../../utils/index'
const {Panel} = Collapse

export class intrachain_transfer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_data: {}
        }
    }

    componentDidMount() {
        console.log(store.getState().communication.search_transaction)
        let send_data = {
            "page": 1,
            "chainId": "",
            "hash": store.getState().communication.search_transaction,
            "pagesize": 5
        }
        $http.post(this, {
            url: "/chain/getBlockNewTxPage",
            dataType: "json",
            data: send_data,
            success: function (res) {
                if (res.code === 200) {
                    this.setState({
                        table_data: res.data.transactionsList.dataList[0]
                    })
                } else {

                }

            },
        })
    }

    render() {
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
        return (
            <div className='in_con'>
                <Collapse defaultActiveKey={['1', '2', '3', '4','5','6','7','8','9','10',]}>
                    <Panel header="交易哈希" key="1">
                        <p>{this.state.table_data.hash}</p>
                    </Panel>
                    <Panel header="所属区块" key="3">
                        <p>{this.state.table_data.chainId}</p>
                    </Panel>
                    <Panel header="时间戳" key="4">
                        <p>{utils.timestampToTime(this.state.table_data.timestamp)}</p>
                    </Panel>
                    <Panel header="调用者" key="6">
                        <p>{this.state.table_data.from}</p>
                    </Panel>
                    <Panel header="转账金额" key="8">
                        <p>{utils.scientificCounting(this.state.table_data.nonce)}</p>
                    </Panel>
                    <Panel header="交易费用" key="9">
                        <p>{this.state.table_data.txCost}</p>
                    </Panel>
                    <Panel header="输入数据" key="10">
                        <p>{this.state.table_data.input}</p>
                    </Panel>

                </Collapse>,
            </div>
        )
    }
}

export default intrachain_transfer