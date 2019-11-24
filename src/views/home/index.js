import React, {Component} from 'react'
import intl from 'react-intl-universal'
import {Input, Button, Table, message} from 'antd'
import {$http} from '../../services/http'
import {connect} from 'react-redux'
import store from '../../store/index'
import './index.css'
import utils from '../../utils/index'
import {home_blockDetails,search_transaction} from '../../store/actions/addAction'

export class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input_value_1: '',
            input_value_2: '',
            table_data: [],
        }
        store.subscribe(() => {
            const state = store.getState().change_lang.lang
            if (state === 'en-US') {
            } else {

            }
        })
    }

    componentDidMount() {
        let send_data = {"page": 1, "chainId": "", "hash": "", "pagesize": 10}
        $http.post(this, {
            url: "/chain/getBlockNewTxPage",
            dataType: "json",
            data: send_data,
            success: function (res) {
                this.setState({table_data: res.data.transactionsList.dataList})
            },
        })
    }

    // componentWillReceiveProps(props,state){
    //     if(this.props.lang==props.lang){
    //
    //     }else {
    //         if(props.lang=='en-US'){
    //             this.search_1()
    //         }else {
    //
    //         }
    //     }
    //
    // }
    search_block(value ){
       this.setState({
           input_value_1:value
       })
    }
    search_tr(value ){
       this.setState({
           input_value_2:value
       })
    }
    search_block_heght() {
        if (this.state.input_value_1 === '') {
            message.error('请输入正确块高，（不能为空！）')
        } else {
            this.props.dispatch(home_blockDetails(this.state.input_value_1))
            this.props.history.push('/block_details')
        }
    }
    search_block_transaction() {
        if (this.state.input_value_2 === '') {
            message.error('请输入正确交易hash，（不能为空！）')
        } else {
            let send_data = {
                "page": 1,
                "chainId": "",
                "hash":this.state.input_value_2,
                "pagesize": 5
            }
            $http.post(this, {
                url: "/chain/getBlockNewTxPage",
                dataType: "json",
                data: send_data,
                success: function (res) {
                    if (res.code === 200) {
                        if(res.data.transactionsList.dataList.length===0){
                            message.error('查询结果为空，请输入正确交易hash（不能为空！）')
                        }else {
                            this.props.dispatch(search_transaction(this.state.input_value_2))
                            this.props.history.push('/intrachain_transfer')
                        }
                    } else {

                    }

                },
            })

        }
    }
    see_more_tr(){
        this.props.history.push('/trading_information')
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
                align: 'center'
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
            <div className='home_con'>
                <div className='home_title'> {intl.get('blockchain_details')} </div>
                <div className='home_search'>
                    <div className='home_search_part'>
                        {intl.get('block_height_query')}<br/>
                        <Input placeholder={intl.get('enter_search_content')} className='search_class'
                               defaultValue=''
                               onChange={(e)=>{this.search_block(e.target.value)}}>
                        </Input>
                        <Button type='primary' style={{marginLeft: 30}}
                                onClick={() => this.search_block_heght()}>{intl.get('search')}</Button>
                    </div>
                    <div className='home_search_part'>
                        {intl.get('block_transaction_inquiry')}<br/>
                        <Input placeholder={intl.get('enter_search_hash')} className='search_class'
                               defaultValue=''
                               onChange={(e)=>{this.search_tr(e.target.value)}}>
                        </Input>
                        <Button type='primary' style={{marginLeft: 30}}
                                onClick={() => this.search_block_transaction()}>{intl.get('search')}</Button>
                    </div>
                </div>
                <div className='home_tr'>
                    <div className='home_title' style={{marginBottom: 30}}>
                        {intl.get('trading_information')}
                    </div>
                    <div>
                        <Table pagination={false} columns={columns} dataSource={this.state.table_data} rowKey={row => row.hash}>

                        </Table>

                    </div>

                </div>
                <Button type='primary' className='see_more_tr' onClick={()=>this.see_more_tr()}>
                    查看更多交易
                </Button>
            </div>
        )
    }

}

// function mapStateToProps(store) {
//     return {
//         lang: store.change_lang.lang
//     }
// }

export default connect()(home)
// export default home
