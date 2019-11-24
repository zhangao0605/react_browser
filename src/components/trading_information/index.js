import React, {Component} from 'react'
import {Select, message, Table, Pagination} from 'antd'
import './index.css'
import {$http} from "../../services/http";
import intl from 'react-intl-universal'
import utils from '../../utils/index'
import store from '../../store/index'
import {search_transaction} from "../../store/actions/addAction";

const {Option} = Select;

export class trading_information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_data: [],
            current: 1,
            total: 1,
            type: '',
            zh_show: true,
            menu_arr: [],
            menu_arr1: [
                {'type': '', 'name': 'All'},
                {'type': '1', 'name': 'Contract is issued'},
                {'type': '2', 'name': 'Contract deal'},
                {'type': '3', 'name': 'Within the chain trading'},
            ]
            ,
            menu_arr2: [
                {'type': '', 'name': '全部'},
                {'type': '1', 'name': '合约发布'},
                {'type': '2', 'name': '合约交易'},
                {'type': '3', 'name': '链内交易'},
            ]
        }
        store.subscribe(() => {
            console.log('sds')
            const state = store.getState().change_lang.lang
            if (state === 'en-US') {
                this.setState({
                    menu_arr:this.state.menu_arr1
                })
            } else {
                this.setState({
                    menu_arr:this.state.menu_arr2
                })
            }
        })
    }
    trading_type_zh(e){
        let type=''
        if(e==1){
            type='合约发布'
        }else if(e==2){
            type='合约交易'
        }else {
            type='链内交易'
        }
        return type
    }
    trading_type_us(e){
        let type=''
        if(e==1){
            type='Contract is issued'
        }else if(e==2){
            type='Contract deal'
        }else {
            type='Within the chain trading'
        }
        return type
    }
    get_data(type, current) {
        let send_data = {"chainId": "", "page": current, "txtype": type, "pagesize": 10}
        $http.post(this, {
            url: "/chain/getTxByTxTypeAndChainId",
            dataType: "json",
            data: send_data,
            success: function (res) {
                if (res.code === 200) {
                    if (res.data.transactionsList.dataList.length === 0) {
                        message.error('数据加载失败，请稍后重试！')
                    } else {
                        // this.props.dispatch(search_transaction(this.state.input_value_2))
                        // this.props.history.push('/intrachain_transfer')
                        this.setState({
                            table_data: res.data.transactionsList.dataList,
                            total: res.data.transactionsList.total
                        })
                    }
                } else {

                }

            },
        })
    }

    handleChange = value => {
        this.setState({
            type: value
        })
        this.get_data(value, 1)
    }
    onChange = page => {
        this.setState({
            current: page
        })
    }

    componentDidMount() {
        if(store.getState().change_lang.lang === 'en-US'){
            this.setState({
                menu_arr:this.state.menu_arr1
            })
        }else {
            this.setState({
                menu_arr:this.state.menu_arr2
            })
        }
        this.get_data('', 1)

    }

    render() {
        const columns = [
            {
                title: intl.get('Hash'),
                dataIndex: 'hash',
                ellipsis: true,
                align: 'center',
                render: value => <span>{utils.slice_hash(value)}</span>,
            },
            {
                title: intl.get('own_chain'),
                dataIndex: 'chainId',
                align: 'center'
            },
            {
                title: intl.get('timestamp'),
                dataIndex: 'timestamp',
                align: 'center',
                render: value => <span>{utils.timestampToTime(value)}</span>
            },
            {
                title: intl.get('transaction_type'),
                dataIndex: 'txType',
                align: 'center',
                render: value =>
                    <div>

                        {
                            store.getState().change_lang.lang == "zh-CN"&& <span >{this.trading_type_zh(value)}</span>

                        }
                        {
                            store.getState().change_lang.lang == "en-US"&& <span >{this.trading_type_us(value)}</span>

                        }
                    </div>
            },
            {
                title: intl.get('initiator'),
                dataIndex: 'from',
                align: 'center',
                render: value => <span>{utils.slice_hash(value)}</span>,
            },
            {
                title: intl.get('receiver'),
                dataIndex: 'to',
                align: 'center',
                render: value => <span>{utils.slice_hash(value)}</span>,
            },
            {
                title: intl.get('transfer_amount'),
                dataIndex: 'nonce',
                align: 'center',
                render: value => <span>{utils.scientificCounting(value)}</span>
            },
            {
                title: intl.get('operating'),
                align: 'center',
                render: (text, record) => (
                    <span>
        <span> {record.chainId}</span>
        <span onClick={() => {
            this.delite()
        }}>Delete</span>
      </span>
                ),
            },
        ]
        return (
            <div className='tr_in'>
                <div className='tr_in_header'>
                    交易信息
                </div>
                <div>
                    <Select
                        size='default'
                        style={{width: 250, marginTop: 30}}
                        defaultValue=''
                        placeholder=''
                        onChange={this.handleChange}>
                        {this.state.menu_arr.map(d => <Option key={d.type} value={d.type}>{d.name}</Option>)}

                    </Select>
                    <div>

                        <Table className='tr_in_table' pagination={false} columns={columns}
                               dataSource={this.state.table_data} rowKey={row => row.hash}>

                        </Table>
                        <Pagination className='tr_in_pageination' current={this.state.current} defaultPageSize={10}
                                    onChange={this.onChange} total={this.state.total}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default trading_information