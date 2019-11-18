import {ADD_NUMBER} from "../actionTypes";

const initState = {
    count: 0,
}
export default function addNumber(state = initState, action) {
    switch (action.type) {
        case ADD_NUMBER:
            return{count: state.count + 1}
        default:
            return state;
    }
}