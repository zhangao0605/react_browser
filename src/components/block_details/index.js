import React, {Component} from 'react'
import {connect} from "react-redux"

export class block_details extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        console.log(this.props.parames_id)
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        parames_id: store.communication.home_blockDetails
    }
}

export default connect(mapStateToProps)(block_details)