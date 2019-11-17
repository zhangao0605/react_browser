import React, {Component} from 'react'
import intl from 'react-intl-universal'
import './index.css'
import {Input, Button, Table} from 'antd'
import {$http} from '../../services/http'

export class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input_value_1: '',
            input_value_2: '',
            table_data:[],
        }

    }

    search_1() {
        console.log('111')
    }

    search_2() {
        console.log('222')
    }

    delite() {
        console.log('lll')
    }
    componentDidMount() {
        let send_data={"page":1,"chainId":"","hash":"","pagesize":10}
        $http.post(this, {
            url: "/chain/getBlockNewTxPage",
            dataType: "json",
            data: send_data,
            success: function (res) {
                console.log(res)
                this.setState({table_data: res.data.transactionsList.dataList})
                setTimeout = () => {

                }

            },
        });
    }

    render() {
        const columns = [
            {
                title: intl.get('blockchain_details'),
                dataIndex: 'hash',
                ellipsis: true,
                align: 'center',
                render: text => <a>{text}</a>,
            },
            {
                title: '所属链',
                dataIndex: 'chainId',
                align: 'center'
            },
            {
                title: '时间戳',
                dataIndex: 'timestamp',
                align: 'center'
            },
            {
                title: '交易类型',
                dataIndex: 'txType',
                align: 'center'
            },
            {
                title: '发起方',
                dataIndex: 'from',
                ellipsis: true,
                align: 'center'
            },
            {
                title: '接收方',
                dataIndex: 'to',
                ellipsis: true,
                align: 'center'
            },
            {
                title: '转账金额',
                dataIndex: 'nonce',
                align: 'center'
            },
            {
                title: 'Action',
                align: 'center',
                render: (text, record) => (
                    <span>
        <a> {record.chainId}</a>
        <span onClick={() => {
            this.delite()
        }}>Delete</span>
      </span>
                ),
            },
        ];
        return (
            <div className='home_con'>
                <div className='home_title'> {intl.get('blockchain_details')} </div>
                <div className='home_search'>
                    <div className='home_search_part'>
                        区块链交易查询<br/>
                        <Input placeholder='请输入搜索内容' className='search_class' value={this.state.input_value_1}></Input>
                        <Button type='primary' style={{marginLeft: 30}} onClick={() => this.search_1()}>搜索</Button>
                    </div>
                    <div className='home_search_part'>
                        区块链交易查询<br/>
                        <Input placeholder='请输入搜索内容' className='search_class' value={this.state.input_value_2}></Input>
                        <Button type='primary' style={{marginLeft: 30}} onClick={() => this.search_2()}>搜索</Button>
                    </div>
                </div>
                <div className='home_tr'>
                    <div className='home_title'>
                        交易信息
                    </div>
                    <div>
                        <Table columns={columns} dataSource={this.state.table_data}></Table>
                    </div>

                </div>
            </div>
        )
    }

    Ò
}

export default home