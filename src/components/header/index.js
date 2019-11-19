import React, {Component} from 'react'
import {createHashHistory} from 'history';
import intl from 'react-intl-universal'
import {change_lang} from '../../store/actions/addAction'
import {connect} from 'react-redux';
import {emit} from '../../locales/emits';
import './index.css'
import {Select} from 'antd';
const {Option} = Select;

const history = createHashHistory();
export class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu_arr: [
                {'name': '中文', 'id': 'zh-CN'},
                {'name': 'English', 'id': 'en-US'},
            ],
            menu_value: this.props.lang,
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleChange(value) {
        emit.emit('change_language', value);
        this.props.dispatch(change_lang(value))
    }

    to_download() {
        // console.log()
        // this.props.history.push('/download')
    }

    render() {
        return (
            <div className='header_con'>
                <div className='heder_name' style={{}} onClick={()=>{history.push('/')}}>THINKET</div>
                <div>
                    <Select
                        size='default'
                        style={{width: 200}}
                        defaultValue={this.state.menu_value}
                        placeholder=''
                        onChange={(e) => this.handleChange(e)}>
                        {this.state.menu_arr.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}

                    </Select>
                    <span className='heder_dow' onClick={() => {
                        history.push(`/download`);
                    }}>{intl.get('api_download')}</span>
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

export default connect(mapStateToProps)(header);