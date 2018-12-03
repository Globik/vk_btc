const LocalStrategy=require('passport-local').Strategy;
const crypto=require('crypto');
//const OAuth2Strategy=require('passport-oauth2');
const p=require('passport-strategy');
const util=require('util');
const urli=require('url');

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
this.name='fake';
this.fake_url_str = options.fake_url_str;
this._verify = verify;
this._passReqToCallback = options.passReqToCallback;
}
util.inherits(fakeStrategy, p.Strategy);

function Strateg(options, verify){
//unused
//OAuth2Strategy.call(this, options,verif(options,verify));	
//verif(this,verify);
}



fakeStrategy.prototype.authenticate=function(req, options) {
console.log("lool");
//console.log("REQ=> ", req);//ok for req
options = options || {};
var self=this;


function verified(err, user, info) {
console.log("verified");
if(err){console.log('verif.err: ', err);return self.error(err);}
if(!user){console.log('!user');return self.fail(info);}
info = info || {};
var state="some_state verif";
if(state){info.state=state;}
self.success(user, info);
}


var ad=new urli.URL(this.fake_url_str);
console.log('ad: ', ad.searchParams);
let auth_key=ad.searchParams.get('auth_key');

return this._verify(req, auth_key, verified);
}

module.exports=function(fake_db, passport){
	
var fake_user_list=fake_db;
//[{uname:"Vadik", id:1, role:"admin", email:"fake@ya.ru", pwd:"pwd"}]

//find_target(fake_user_list,"uname","Vadik").then(d=>{console.log("user: ", d)})

passport.use(new fakeStrategy({vkapp_protected_key: fake_vkapp_protected_key, url:"https://my_local_app.ru:8000/api",
fake_url_str: fake_url_str},
 function(req, auth_key, done){
//console.log('***req: ***', req);//req must be, aha ok
console.log("auth_key: ", auth_key);
var addis=`${fake_vk_app_id}_${fake_viewer_id}_${fake_vkapp_protected_key}`;
console.log("addis: ", addis);
var ak_eq=crypto.createHash('md5').update(addis).digest('hex');
console.log("ak_eq: ", ak_eq);
console.log("is auth_key equal: ", (auth_key==ak_eq));//true false, by

return done(null,{id: 2, vker:"Mer"}, {message:"info msg here"});
}))

passport.serializeUser(function pass_serialize(luser,done){
console.log('in serialize USERA: ',luser);
done(null,luser.id)
})

passport.deserializeUser(async function pass_deserialize(id,done){
console.log("from within deserializeUser")
try{
let us=await find_target(fake_user_list, "id", id);
done(null, us)
}catch(e){
done(e)
}
})

passport.use(new LocalStrategy({usernameField:'uname', passwordField:'password'}, async function do_loc_strat(uname,password,done){
console.log("loc strategy: ", uname, " ", password);
try{
let user=await find_target(fake_user_list, "uname", uname)
console.log("user in loc strat: ", user);
let bus=user;
if(!user){return done(null,false,{message:'Wrong user email or password!'})}
return done(null, bus,{message:'Erfolgreich loged in!!!'})
}catch(err){return done(err)} 

}))

//var VK=Strategy;

}
