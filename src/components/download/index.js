import React, {Component} from 'react'
import {$http} from '../../services/http'
import {Table} from 'antd'
import {connect} from 'react-redux'
import store from "../../store";
import intl from 'react-intl-universal'
import utils from '../../utils/index'
import './index.css'
export class download extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table_arr:[]

        }
        store.subscribe(() => {
            const state = store.getState().change_lang.lang
            if (state === 'en-US') {
                this.change_lang_getdata('en-US')
            } else {
                this.change_lang_getdata('zh-CN')
            }
        })
    }
    componentDidMount(){
        this.change_lang_getdata(this.props.lang)
    }
    change_lang_getdata(e){
        let data={'locale':e}
        $http.get(this, {
            url: "/file",
            dataType: "json",
            data: data,
            success: function (response) {
                if(e==='zh-CN'){
                    response.data.SDK.forEach((item,index,self)=>{
                        console.log(item)
                        item.fileName=item.fileName.replace(/THINK/,'芯际')
                    })
                }
                this.setState({
                    table_arr:response.data.SDK
                })
            },
        });
    }
    render() {
        const columns = [
            {
                title: intl.get('file_name'),
                dataIndex: 'fileName',
                align: 'center',
                render: text => <span>{text}</span>,
            },
            {
                title: intl.get('file_create_Time'),
                dataIndex: 'createTime',
                align: 'center',
                render: text => <span>{utils.timestampToTime(text)}</span>,
            },
            {
                title: intl.get('file_size'),
                dataIndex: 'fileSize',
                align: 'center'
            },
            {
                title: intl.get('file_version'),
                dataIndex: 'version',
                align: 'center'
            },
        ];
        return (
            <div>
                <div className='table_div'>
                    <Table columns={columns} dataSource={this.state.table_arr} rowKey={(record, index) => index}></Table>
                </div>
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
        lang: store.change_lang.lang
    }
}

export default connect(mapStateToProps)(download);