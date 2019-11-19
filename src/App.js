import React, {Component} from 'react'
import './App.css';
import Router from './router/index'
import {emit} from './locales/emits'
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import intl from 'react-intl-universal';
import {ConfigProvider} from 'antd';
import {connect} from 'react-redux';
import Header from "./components/header";


const locales = {
    'en-US': require('./locales/en-US.json'),
    'zh-CN': require('./locales/zh-CN.json'),
};

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            antdLang: '',  // 修改antd  组件的国际化
        }
    }

    componentDidMount() {
        emit.on('change_language', lang => this.loadLocales(lang)); // 监听语言改变事件
        this.loadLocales(); // 初始化语言
    }

    loadLocales(lang = this.props.lang) {
        intl.init({
            currentLocale: lang,  // 设置初始语音
            locales,
        }).then(() => {
            this.setState({
                antdLang: lang === 'zh-CN' ? zh_CN : en_US
            });
        });
    }

    render() {
        return (
            // ConfigProvider antd  组件的国际化
            <ConfigProvider locale={this.state.antdLang}>
                <Header/>
                <Router/>
            </ConfigProvider>

        );
    }


}

// 定义方法mapStateToProps，参数为state，并且返回一个对象，对象内定义需要获取的store内的数据，
// 由于是使用的countReducer中的数据，所以需要使用state.countReducer.属性名
function mapStateToProps(store) {
    return {
        lang: store.change_lang.lang
    }
}

export default connect(mapStateToProps)(App);
