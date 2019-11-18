import React, {Component} from 'react'
import {Button} from 'antd'
import {connect} from 'react-redux'
import {addNumber} from "../../store/actions/addAction";

export class home_con extends Component {
    constructor(props) {
        super(props)
    }

    add() {
        this.props.dispatch(addNumber())
    }

    render() {
        return (
            <div>
                <Button type='primary' onClick={() => {
                    this.add()
                }}>加加加</Button>
               <div> {this.props.number}</div>
                <Button onClick={() => {
                    this.props.history.push(`/download`);
                }}>sss</Button>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        number: store.addReducer.count
    }
}

export default connect(mapStateToProps)(home_con)