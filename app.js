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

var fake_user_list=[{uname:"Vadik",ufa:"Popov", id:1, role:"admin", email:"fake@ya.ru", pwd:"pwd"}
/*{uname:"Bob",id:160441250,role:"user",email:"what@rambler.ru",pwd:"pwd"}*/];

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
//let n=ctx.session.views || 0;
//ctx.session.views=++n;
let b=ctx.cookies.get('koa:sess');
//ctx.cookies.set("mumi","fucky");
console.log("UUUSSSEEERRR: ", ctx.state.user);
let data={views: "n",cook: b, sessions: ctx.session, 
state: ctx.state.user, 
authenticated: ctx.isAuthenticated()
};
let data_json;
try{
data_json=JSON.stringify(data);	
}catch(e){
data_json=e;	
}
ctx.body=await ctx.render('main_page', {some_data: data_json});	
})

pub.get('/lapi',doo,async ctx=>{
//console.log("ctx.url: ", ctx.url);// ok, just like there, on frontend, all stuff in url, hashtag etc
//console.log("ctx.query: ", ctx.query);//perfect! genau richtig what I need, there is a parsed object for you
ctx.body=await ctx.render('main', {session:JSON.stringify(ctx.session)});	
})

pub.get('/page', async ctx=>{
console.log("/page ctx.query: ", ctx.query,"ctx.url", ctx.url);//if no query, so simply {}
console.log("/page ctx.href: ", ctx.href);
console.log("CTXUSER: ", ctx.state.user);
console.log("sessions: ", ctx.session);
ctx.body=await ctx.render('page',{});	
});


//async  function doo(ctx, next){
async function doo(ctx, next){	
console.log('in doo SESSIONS:', ctx.session);
console.log('in doo ctx.user: ', ctx.state.user);
if(ctx.isAuthenticated()){
//return ctx.redirect("/api");
console.log("It's authenticated!");
return next();
}

return await passport.authenticate('fake', async function(err,user,info, status){
console.log("err: ", err, "user: ", user, "info: ", info, "status: ", status);
if(err){console.log(err);
//return ctx.redirect('/api');
}
//return
if(!user){
console.log('not a user');
//return ctx.redirect("/api");	
}else{
//ctx.redirect('/api');
await ctx.login(user);
//return next();
}
return next();
}
)(ctx,next);
}










/*
pub.get('/lapi', async function(ctx, next){	
console.log('in dow SESSIONS:', ctx.session);
console.log('in dow ctx.user: ', ctx.state.user);
if(ctx.isAuthenticated()){return ctx.redirect("/api");}
return await passport.authenticate('fake', async function(err,user,info, status){
console.log("err: ", err, "user: ", user, "info: ", info, "status: ", status);
if(err){console.log(err);return ctx.redirect('/api');}
//return
if(!user){
console.log('not a user');return ctx.redirect("/api");	
}else{
ctx.redirect('/api');
return await ctx.login(user);
//return next();
}
}
)(ctx,next);
}
)
*/ 

//pub.get('/lapi',passport.authenticate('fake',{successRedirect:'/api'}));
//pub.get('/lapi',passport.authorize('fake',{successRedirect:'/api'}));

pub.post('/login', async function(ctx,next){
if(ctx.isAuthenticated()){console.log("already authenticated", ctx.state.user);
	//return ctx.redirect("/");
	}
return  await passport.authorize('local', async function(err,user,info,status){
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
//pub.get('/login',passport.authorize('local',{successRedirect: '/'}));
pub.get('/logout', ctx=>{
	console.log("*** LOGOUT! ***");
if(ctx.session.extra) delete ctx.session.extra;
//if(ctx.session"vt":4,"as":1,"iau":1,"at
delete ctx.session.vt;
delete ctx.session.as;
delete ctx.session.iau;
delete ctx.session.at;
delete ctx.session.fake_fucker;
ctx.logout();ctx.redirect('/');
});

app.use(pub.routes()).use(pub.allowedMethods());
app.on('error',(err, ctx)=>{
	console.log('sess: ',ctx.session);
	/*extra: { pipka: 'suka', mishka: 'dura' },
  vt: 4,
  as: 1,
  iau: 1,
  at: 'c90d05003c73acd8a4471e11a8f8c8776588ef28482dba38de711c41e6ca2d01110142c989ce8d4708f02' }
  */ 
	delete ctx.session.passport;
	delete ctx.session.extra;
	delete ctx.session.vt;
	delete ctx.session.as;
	delete ctx.session.iau;
	delete ctx.session.at;
	console.log('sess2: ', ctx.session);
console.log('app.on.errorsssssssssssss: ',err.message, ctx.request.url);
ctx.logout();ctx.redirect('/');
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
