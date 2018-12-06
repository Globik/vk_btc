//process environments
// sudo leafpad /etc/environment
//VK_BTC_TEST_APP_ID='6***9'
//VK_BTC_TEST_SECRET_KEY='p***U6'
// source /etc/environment
// echo $VK_BTC_TEST_APP_ID



const LocalStrategy=require('passport-local').Strategy;
const crypto=require('crypto');
const p=require('passport-strategy');
const util=require('util');
const urli=require('url');

const green = "\x1b[32m";
const yellow ="\x1b[33m";
const red ="\x1b[31m";
const rst ="\x1b[0m";

console.log(green, "start",rst);
const find_target=(arr, id, m)=>new Promise((resolve, reject)=>resolve(arr.find(el=>el[id]==m)));
const fake_vk_app_id=6753809;
const fake_vkapp_protected_key="pd06";
const fake_viewer_id=11441250;
const fake_auth_key_from_url="2aa4b12b47be808cf435830f0bd4f96e";
//const fake_vk_service_app_access_key="234ba";
const fake_url_str=`https://my_app_local.ru:8000/api?api_url=https://api.vk.com/api.php&api_id=${fake_vk_app_id}&api_settings=1&viewer_id=${fake_viewer_id}&viewer_type=4&sid=8440750d&secret=971f7e&access_token=fc5b1467275&user_id=0&group_id=174008877&is_app_user=1&auth_key=${fake_auth_key_from_url}&language=0&parent_language=0&is_secure=1&stats_hash=078b0fdf9926&ads_app_id=6711809_63374&api_result=%7B%22response%22%3A%5B%7B%22uid%22%3A160441250%2C%22first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%A8%D0%B0%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%22%7D%5D%7D&referrer=unknown&lc_name=ab471bd8&sign=742afd13061&hash=pipka%3Dsuka%26mishka%3Ddura`;
//if "hash"'s (key)  value is empty shows simply => ''
console.log(fake_url_str);

function fakeStrategy(options, verify) {
if (typeof options == 'function') {
verify = options;
options = undefined;
}
options = options || {};
console.log('opt url: ', options.url); 
p.Strategy.call(this);
this.fake_secret_key=options.fake_secret_key; 
this.fake_app_id= options.fake_app_id; 

this.vk_btc_test_app_id= options.vk_btc_test_app_id;
this.vk_btc_test_secret_key= options.vk_btc_test_secret_key;

this.name='fake';
this.fake_url_str = options.fake_url_str;
this._verify = verify;
this._passReqToCallback = options.passReqToCallback;
}
util.inherits(fakeStrategy, p.Strategy);


fakeStrategy.prototype.authenticate=function(req, options) {
console.log("lool");
console.log("REQ=> ", req);//ok for req
options = options || {};
var self=this;
//return this.fail("eeeeeeeeeeeeeeeeee", 403);//fine

function verified(err, user, info) {
console.log("verified");
if(err){console.log('verif.err: ', err);return self.error(err);}
if(!user){console.log('!user');return self.fail(info);}
info = info || {};
var state="some_state verif";
if(state){info.state=state;}
self.success(user, info);
}

console.log("REDIRECT: ", options.successRedirect);
let ad=new urli.URL(this.fake_url_str);//here must be try catch
//let ad=new urli.URL(`https://${req.header.host}${req.url}`);
console.log('ad: ', ad.searchParams);
let auth_key=ad.searchParams.get('auth_key');
let viewerId=ad.searchParams.get('viewer_id');

const addis=`${this.fake_app_id}_${viewerId}_${this.fake_secret_key}`;

//const addis=`${this.vk_btc_test_app_id}_${viewerId}_${this.vk_btc_test_secret_key}`;
console.log("addis: ", addis);
const ak_eq=crypto.createHash('md5').update(addis).digest('hex');
console.log("AK_EQ: ", ak_eq);
console.log("IS AUTH_KEY EQUAL: ", (auth_key==ak_eq));//true false, by
console.log("AUTH_KEY: ", auth_key);
if(auth_key===auth_key){console.log("TT true");}else{console.log("NOT TRUE");return this.fail("eee", 403);}

console.log("AFTER EQUAL");
let datascope={};
try{
datascope.group_id=Number(ad.searchParams.get('group_id'));
datascope.user_id=Number(ad.searchParams.get('user_id'));
datascope.viewer_type=Number(ad.searchParams.get('viewer_type'));
datascope.api_settings=Number(ad.searchParams.get('api_settings'));
datascope.is_app_user=Number(ad.searchParams.get('is_app_user'));
datascope.access_token=ad.searchParams.get('access_token');
datascope.language=Number(ad.searchParams.get('language'));
datascope.referrer=ad.searchParams.get('referrer');
//datascope.api_result=ad.searchParams.get('api_result');
let ajson;
try{
let forjson=ad.searchParams.get('api_result');
ajson=JSON.parse(forjson);
if(ajson.response && Array.isArray(ajson.response) && (ajson.response.length==1)){
datascope.api_result=ajson.response[0];
}
}catch(e){
console.log("json e: ", red, e, rst);
}

let my_hash=ad.searchParams.get('hash');
datascope.datahash={};
if(my_hash){
let params=new urli.URLSearchParams(my_hash);
//pipka mishka
let pipka=params.get('pipka');
let mishka=params.get('mishka');
//datascope.datahash={};
for(let i of params){
console.log("i: ", i[0]," params: ", params, "i[1]: ", i[1]);	
datascope.datahash[i[0]]=i[1];
}
	
}
}catch(e){console.log(red,e,rst);return this.fail("uuuuhuhu", 403);}
return this._verify(req,  datascope, verified);
}

module.exports=function(fake_db, passport){
	
var fake_user_list=fake_db;
//[{uname:"Vadik", id:1, role:"admin", email:"fake@ya.ru", pwd:"pwd"}]

//find_target(fake_user_list,"uname","Vadik").then(d=>{console.log("user: ", d)})

passport.use(new fakeStrategy({
passReqToCallback:true,
fake_secret_key: fake_vkapp_protected_key, 
fake_app_id: fake_vk_app_id,
url:"https://my_local_app.ru:8000/api",
fake_url_str: fake_url_str,
vk_btc_test_app_id: process.env.VK_BTC_TEST_APP_ID,
vk_btc_test_secret_key: process.env.VK_BTC_TEST_SECRET_KEY
},
function fake_strategy(req, datascope, done){
//console.log('***req: ***', req);//req must be, aha ok

console.log("datascope: ", green, datascope, rst);
console.log("session: ", yellow, req.ctx.session, rst);
//req.ctx.session.passport.account={vkid: datascope.api_result.uid};//?
if(req.ctx.state.user){
console.log("req.ctx.state.user: ", red, req.ctx.state.user, rst);	
}else{console.log(red, "no req.ctx.state.user", rst)}

return done(null,{id: datascope.api_result.uid}, {message:"info msg here"});
}))

passport.serializeUser(function pass_serialize(luser,done){
console.log('in serialize USERA: ',luser);
//luser.fucker="sdddddd";
done(null,luser.id)
})

passport.deserializeUser(async function pass_deserialize(id,done){
console.log("from within deserializeUser")
try{
let us=await find_target(fake_user_list, "id", id);
//us.account="pioooo";
done(null, us)
}catch(e){
done(e)
}
})

passport.use(new LocalStrategy({passReqToCallback:true,usernameField:'uname', passwordField:'password'}, 
async function do_loc_strat(req,uname,password,done){
	console.log("REQ+> ", req);
	console.log("ACCOUNT: ",req.account);
	req.account="suka";
console.log("loc strategy: ", uname, " ", password);
try{
let user=await find_target(fake_user_list, "uname", uname)
console.log("user in loc strat: ", user);
user.account="duj";
let bus=user;
if(!user){return done(null,false,{message:'Wrong user email or password!'})}
return done(null, bus,{message:'Erfolgreich loged in!!!'})
}catch(err){return done(err)} 

}))

//var VK=Strategy;

}
