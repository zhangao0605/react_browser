import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import home from '../components/home/index'
import address_detail from '../components/address_detail/index'
const Routers = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/address_detail" component={address_detail}/>
        </Switch>
    </HashRouter>
)
export default Routers