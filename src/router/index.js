import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import home from '../views/home/index'
import home_con from '../components/home_con/index'
import address_detail from '../components/address_detail/index'
import download from '../components/download/index'
import block_details from '../components/block_details/index'
import single_block_details from "../components/single_block_details"
import intrachain_transfer from "../components/intrachain_transfer"
import trading_information from "../components/trading_information"
const Routers = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/home_con" component={home_con}/>
            <Route exact path="/address_detail" component={address_detail}/>
            <Route exact path="/download" component={download}/>
            <Route exact path="/block_details" component={block_details}/>
            <Route exact path="/single_block_details" component={single_block_details}/>
            <Route exact path="/intrachain_transfer" component={intrachain_transfer}/>
            <Route exact path="/trading_information" component={trading_information}/>
        </Switch>
    </HashRouter>
)
export default Routers