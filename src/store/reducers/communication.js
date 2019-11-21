import {HOME_BLOCKDETAILS, SEARCH_BLOCKHEIGHT,SEARCH_TRANSACTION} from "../actionTypes"

const initState = {
    home_blockDetails: '',
    search_blockheight: {},
    search_transaction: {},
}
export default function component_communication(state = initState, action) {
    switch (action.type) {
        case HOME_BLOCKDETAILS:
            return Object.assign({},state,{home_blockDetails:action.value})
        case SEARCH_BLOCKHEIGHT:
            return Object.assign({},state,{search_blockheight:action.value})
        case SEARCH_TRANSACTION:
            return Object.assign({},state,{search_transaction:action.value})
        default:
            return state
    }
}