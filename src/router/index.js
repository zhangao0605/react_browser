import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import home from '../views/home/index'
import home_con from '../components/home_con/index'
import address_detail from '../components/address_detail/index'
import download from '../components/download/index'
import block_details from '../components/block_details/index'
const Routers = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/home_con" component={home_con}/>
            <Route exact path="/address_detail" component={address_detail}/>
            <Route exact path="/download" component={download}/>
            <Route exact path="/block_details" component={block_details}/>
        </Switch>
    </HashRouter>
)
export default Routers