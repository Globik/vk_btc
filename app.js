const Koa=require('koa');
const https=require('https');
const fs=require('fs');
const koaBody=require('koa-body');
const render=require('koa-rend');
const serve=require('koa-static');
const Router=require('koa-router');
const passport=require('koa-passport');
const urli=require('url');
const session=require('koa-session');

const MY_PORT=8000;
const MY_HOSTNAME='my_app_local.ru';
const dkey='/home/globik/alikon/data/mykey.pem';
const dcert='/home/globik/alikon/data/mycert.pem';

var fake_user_list=[{uname:"Vadik", id:1, role:"admin", email:"fake@ya.ru", pwd:"pwd"},
{uname:"Bob",id:2,role:"user",email:"what@rambler.ru",pwd:"pwd"}];

const app=new Koa();
const pub=new Router();
app.keys=['your-secret'];
app.use(session({httpOnly:false,signed: false,secure:false}, app));
render(app,{root:'views', development: true})
app.use(koaBody())
require('./auth/fake.js')(fake_user_list, passport)
app.use(passport.initialize())
app.use(passport.session())



pub.get('/', async ctx=>{
let n=ctx.session.views || 0;
ctx.session.views=++n;
let b=ctx.cookies.get('koa:sess');
ctx.cookies.set("mumi","fucky");
console.log("UUUSSSEEERRR: ", ctx.state.user);
let data={info:"main", n: n, req: ctx.request, cook: b, sessions: ctx.session, state: ctx.state.user, authenticated: ctx.isAuthenticated()};
let data_json;
try{
data_json=JSON.stringify(data);	
}catch(e){
data_json=e;	
}
ctx.body=await ctx.render('main_page', {some_data: data_json});	
})

pub.get('/api', doo, async ctx=>{
console.log("ctx.params: ", ctx.params);
console.log("ctx.url: ", ctx.url);// ok, just like there, on frontend, all stuff in url, hashtag etc
console.log("ctx.path: ", ctx.path);
console.log("ctx.href: ", ctx.href);
console.log("ctx.query: ", ctx.query);//perfect! genau richtig what I need, there is a parsed object for you
// though if there is a custom "hash" key one need extract extra key value paires
console.log("ctx.querystring: ", ctx.querystring);
console.log("ctx.origin: ", ctx.origin);
	//console.log("req ",ctx.cookies);
let hash_query_str=ctx.query.hash;
console.log('hash_str: ', hash_query_str);// if no such a key it's undefined otherwise as is
if(ctx.query.viewer_id){
fake_user_list[0].account=ctx.query.viewer_id	
}
if(hash_query_str){
let param=new urli.URLSearchParams(hash_query_str);
//pipka mishka
let pipka=param.get('pipka');
let mishka=param.get('mishka');
let fake=param.get('fake');
console.log('pipka: ', pipka);//suka
console.log('mishka: ', mishka);//dura
console.log('fake: ', fake);//null	
let is_fake=param.has('fake');
console.log("is_fake: ", is_fake);// true or false
}
console.log("sessions: ", ctx.session);
console.log("request: ",ctx.request.header.cookie);
console.log("USER: ", ctx.state.user);

ctx.body=await ctx.render('main', {viewer_id: fake_user_list[0].account});	
})

pub.get('/page', async ctx=>{
console.log("/page ctx.query: ", ctx.query,"ctx.url", ctx.url);//if no query, so simply {}
console.log("/page ctx.href: ", ctx.href);
console.log("CTXUSER: ", ctx.state.user);
console.log("sessions: ", ctx.session);
fake_user_list[0].kind="vk_account";
ctx.body=await ctx.render('page',{});	
});

pub.get('/api/:vid', async ctx=>{
	let a=ctx.params.vid;
	console.log("ctx.params.vid: ", a);
	console.log("ctx.url: ", ctx.url);
	console.log("ctx.path: ", ctx.path);
	
	console.log("sessions: ", ctx.session);
	console.log("request: ",ctx.request);
	
ctx.body=ctx.params;	
});
//pub.get('/api',
async  function doo(ctx, next){
console.log('in dow SESSIONS:', ctx.session);
console.log('in dow ctx.user: ', ctx.state.user);
console.log(passport.authenticate);
return await passport.authenticate('fake', async function(err,user,info, status){
console.log("err: ", err, "user: ", user, "info: ", info);
//ctx.redirect('/apis');
//return
 await ctx.login(user);
 return next();
}
)(ctx,next);
//console.log("url:", ctx.url);
//return next();
}
//);

pub.post('/login', async function(ctx,next){
if(ctx.isAuthenticated()){console.log("already authenticated", ctx.state.user);
	return ctx.redirect("/");
	}
return  await passport.authenticate('local', async function(err,user,info,status){
if(err){
//ctx.session.bmessage={success:false,error:err.message}; 
console.log("err in login: ", err.message, " ",info, " ", status);
return ctx.redirect('/');
}
if(user===false){
//ctx.session.bmessage={success:false, error:info.message};
console.log("info: ", info.message);
ctx.redirect('/')
}else{
console.log("it's ok, there is user found");
console.log("err: ", err, "user: ", user, "info: ", info, "status: ", status);
ctx.redirect('/')
return  await ctx.login(user)
}
})(ctx, next)
})

pub.get('/logout', ctx=>{ctx.logout();ctx.redirect('/');});

app.use(pub.routes()).use(pub.allowedMethods());
app.on('error',(err, ctx)=>{
console.log('app.on.error: ',err.message, ctx.request.url);
});

const ssl_options={
key: fs.readFileSync(dkey),
cert: fs.readFileSync(dcert)	
};
https.createServer(ssl_options,app.callback()).listen(MY_PORT, MY_HOSTNAME);

console.log("https://",MY_HOSTNAME,":",MY_PORT);
// from within the localhost
// add into /etc/hosts the line 127.0.0.1 my_app_local.ru
// in a console enter this command: sudo iptables -t nat -l OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRET --to-ports 8000
