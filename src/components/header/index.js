import React,{Component}  from 'react'
import {connect} from 'react-redux';
import {change_lang} from '../../store/actions/addAction'
import {emit} from '../../locales/emits';
import './index.css'
import { Select} from 'antd';
const { Option } = Select;

export class header extends Component{
    constructor(props){
        super(props)
        this.state={
            menu_arr:[
                {'name':'中文','id':'zh-CN'},
                {'name':'English','id':'en-US'},
            ],
            menu_value:this.props.lang,
        }
    }
    componentDidMount() {
    }
    handleChange(value){
        emit.emit('change_language', value);
      this.props.dispatch(change_lang(value))
    }

    render() {
        return(
            <div className='header_con'>
                <div className='heder_name'>THINKET</div>
                <div>
                    <Select
                        size='default'
                        style={{width:200}}
                        defaultValue={this.state.menu_value}
                        placeholder=''
                        onChange={(e)=>this.handleChange(e)}>
                        {this.state.menu_arr.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}

                    </Select>
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
// export default header
export default connect(mapStateToProps)(header);