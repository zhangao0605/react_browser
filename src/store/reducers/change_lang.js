import {LANG} from "../actionTypes";

const initState = {
    lang:'zh-CN'
}
export default function change_lang(state = initState, action) {
    switch (action.type) {
        case LANG:
            return {lang: action.lang}
        default:
            return state;
    }
}