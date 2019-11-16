import React,{Component} from 'react'
import Header from '../../components/header/index'
import intl from 'react-intl-universal'
export class home extends Component{
    constructor(props){
        super(props)
            state:{

            }

    }
    render() {
        return(
            <div>
                <Header/>
                <div><div> {intl.get('SIMPLE')} </div></div>
            </div>
        )
    }
}
export default home