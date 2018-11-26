const crypto=require('crypto');
const data_str="some data string";
const app_id=6753809;
const priv_key="p***6";// защищенный ключ
const priv_key2="aaaaaaaaaaaaa";//сервисный ключ доступа
const viewer_id=100000000;

var mug=crypto.createHash('md5').update(data_str).digest('hex');
const mug_eq="971924a330e64ad286842015e4ed3888";
console.log('mug: ', mug);
console.log("is equal: ",(mug_eq == mug));//true or false

const auth_key_eq="***";
var addis=`${app_id}_${viewer_id}_${priv_key}`;
console.log("addis: ", addis);
var ak=crypto.createHash('md5').update(addis).digest('hex');
console.log("ak: ", ak);
console.log("is auth_key equal: ", (auth_key_eq==ak));//true false, by me is ok

