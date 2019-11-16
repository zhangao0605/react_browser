import {ADD_NUMBER,LANG} from '../actionTypes'
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