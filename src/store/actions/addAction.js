import {ADD_NUMBER,LANG,HOME_BLOCKDETAILS,SEARCH_BLOCKHEIGHT} from '../actionTypes'
export function addNumber() {
    return{
        type:ADD_NUMBER
    }
}
export function change_lang(lang) {
    return{
        type:LANG,
        lang
    }
}
export function home_blockDetails(value) {
    return{
        type:HOME_BLOCKDETAILS,
        value
    }
}
export function search_blockheight(value) {
    return{
        type:SEARCH_BLOCKHEIGHT,
        value
    }
}