const Koa=require('koa');
const https=require('https');
const fs=require('fs');
const koaBody=require('koa-body');
const render=require('koa-rend');
const serve=require('koa-static');
const Router=require('koa-router');
const urli=require('url');
const session=require('koa-session');

const MY_PORT=8000;
const MY_HOSTNAME='my_app_local.ru';
const dkey='/home/globik/alikon/data/mykey.pem';
const dcert='/home/globik/alikon/data/mycert.pem';
const app=new Koa();
const pub=new Router();
app.keys=['your-secret'];
app.use(session({httpOnly:false,signed: false,secure:false}, app));
render(app,{root:'views', development: true})
pub.get('/', async ctx=>{
let n=ctx.session.views || 0;
ctx.session.views=++n;
let b=ctx.cookies.get('koa:sess');
ctx.cookies.set("mumi","fucky");
ctx.body={info:"main", n: n, req: ctx.request, cook: b, sessions: ctx.session};//await ctx.render('main',{});	
})
pub.get('/api', async ctx=>{
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
	console.log("request: ",ctx.request);
ctx.body=await ctx.render('main',{});	
})
pub.get('/page', async ctx=>{
console.log("/page ctx.query: ", ctx.query);//if no query, so simply {}
console.log("/page ctx.href: ", ctx.href);
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
