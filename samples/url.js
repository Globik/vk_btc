/*const url_str="https://my_app_local.ru:8000/api?api_url=https://api.vk.com/api.php&api_id=6733809&"+
"api_settings=1&viewer_id=160331250&viewer_type=4&sid=eb6bd48&secret=c31f&access_token=8724d7f&user_id=0&group_id=174003077"+
"&is_app_user=1&auth_key=c4828a92eb630bf71c24&language=0&parent_language=0&is_secure=1&stats_hash=0787e9926"+
"&ads_app_id=b9e"+
"&api_result=%7B%22response%22%3A%5B%7B%22uid%22%3A160441250%2C%22first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%A8%D0%B0%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%22%7D%5D%7D"+
"&referrer=unknown&lc_name=3553232a&sign=28dda6abacdaf77&hash=pure&btc=10";
*/


const url_str="https://my_app_local.ru:8000/api?api_url=https://api.vk.com/api.php&api_id=1153809&api_settings=1&viewer_id=11441250&viewer_type=4&sid=8440750d&secret=971f7e&access_token=fc5b1467275&user_id=0&group_id=174008877&is_app_user=1&auth_key=c4630bc24&language=0&parent_language=0&is_secure=1&stats_hash=078b0fdf9926&ads_app_id=6711809_63374&api_result=%7B%22response%22%3A%5B%7B%22uid%22%3A160441250%2C%22first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%A8%D0%B0%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%22%7D%5D%7D&referrer=unknown&lc_name=ab471bd8&sign=742afd13061&hash=pipka%3Dsuka%26mishka%3Ddura";//if "hash"'s (key)  value is empty shows simply => ''
const url_str2="https://fake.com/me";
const urli=require('url');
//console.log(url_str);
const ab=urli.parse(url_str);
console.log("ab: ", ab.query);//if no query then is null

var ad=new urli.URL(url_str);
console.log('ad: ', ad.searchParams);
//console.log('adi: ', ad.searchParams.get('hash'));
var hash_query_str=ad.searchParams.get('hash');
if(hash_query_str){
console.log("SEE hash_query_str: ", hash_query_str);
let params=new urli.URLSearchParams(hash_query_str);
//pipka mishka
let pipka=params.get('pipka');
let mishka=params.get('mishka');
let fake=params.get('fake');
console.log('pipka: ', pipka);//suka
console.log('mishka: ', mishka);//dura
console.log('fake: ', fake);//null
console.log("is fake: ", params.has('fake'));//true or false
}

var api_result=ad.searchParams.get('api_result');
if(api_result){
console.log('api_result: ', api_result);

try{
let st=JSON.parse(api_result);
console.log('st: ', st);
console.log('uid: ', st.response[0].uid);
console.log('first_name: ', st.response[0].first_name);
console.log('last_name: ', st.response[0].last_name);
}catch(e){
console.log('json parse error: ', e);	
}	
}
