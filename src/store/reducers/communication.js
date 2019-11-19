import {HOME_BLOCKDETAILS,} from "../actionTypes"
const initState = {
    home_blockDetails:''
}
export default function component_communication(state = initState, action) {
    switch (action.type) {
        case HOME_BLOCKDETAILS:
            return {home_blockDetails: action.value}
        default:
            return state;
    }
}