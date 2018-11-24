const Koa=require('koa');
const https=require('https');
const fs=require('fs');
const koaBody=require('koa-body');
const render=require('koa-rend');
const serve=require('koa-static');
const Router=require('koa-router');

const MY_PORT=8000;
const MY_HOSTNAME='my_app_local.ru';
const dkey='/home/globik/alikon/data/mykey.pem';
const dcert='/home/globik/alikon/data/mycert.pem';
const app=new Koa();
const pub=new Router();
app.keys=['your-secret'];
render(app,{root:'views', development: true})
pub.get('/', async ctx=>{
ctx.body={info:"main"};//await ctx.render('main',{});	
})
pub.get('/api', async ctx=>{
	console.log("ctx.params: ", ctx.params);
	//console.log("ctx.url: ", ctx.url);// ok, just like there, on frontend, all stuff in url, hashtag etc
	console.log("ctx.path: ", ctx.path);
	//console.log("req ",ctx.cookies);
ctx.body=await ctx.render('main',{});	
})
pub.get('/page', async ctx=>{
ctx.body=await ctx.render('page',{});	
});
pub.get('/api/:vid', async ctx=>{
	let a=ctx.params.vid;
	console.log("ctx.params.vid: ", a);
	console.log("ctx.url: ", ctx.url);
	console.log("ctx.path: ", ctx.path);
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
