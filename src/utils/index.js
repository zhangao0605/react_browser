import moment from 'moment'
import BigNumber from 'bignumber.js'
export default {
    timestampToTime(timestamp){
        let time = ''
        if (timestamp === '' || timestamp === null || timestamp === undefined) {
            time = ''
        } else {
            time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
        return time
    },
    slice_hash(e) {
        if (e === '' || e === null || e ===undefined) {
            return ''
        } else {
            let a = e.slice(0, 4)
            let b = e.substring(e.length - 4)
            let c = a + ' *** ' + b
            return c
        }
    },
    scientificCounting (e) {
        let num = 0
        if (e === 0 || e === '' || e === null || e === undefined) {
            num = 0
        } else {
            num = new BigNumber(`${e}`).div("1e+18").toString(10);
            // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
            //   num = parseFloat(num).toFixed(6)
            // }
        }
        return num
    },
    trading_type(e){
        let type=''
        if(e==1){
            type='合约发布'
        }else if(e==2){
            type='合约交易'
        }else {
            type='链内交易'
        }
        return type
    }
}