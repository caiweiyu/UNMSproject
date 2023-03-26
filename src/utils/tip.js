import { Toast } from 'vant';
import { Message } from 'element-ui';

export const tip = (e = {
    type: '',
    msg: ''
}) => {
    // console.log(document.body.clientWidth + 'px');
    let { type, msg } = e
    let tipType = ''
    if (type == 'error') {
        document.body.clientWidth > 960 ? tipType = "error" : tipType = 'fail'
    } else {
        tipType = 'success'
    }
    // console.log('tipType', tipType);
    if (document.body.clientWidth > 960) {
        Message[tipType](msg)
    } else {
        Toast[tipType](msg)
    }
}