const Router=require('koa-router');
const bodyParser=require('koa-body');
const p=new Router();
p.get('/testAdmin', async ctx=>{
console.log(ctx.path);
console.log(ctx.session);
ctx.body=await ctx.render('test_admin',{});	
})
p.post('/testSavebtcaddress',/*bodyParser({multipart:true,formidable:{}}),*/ async ctx=>{
console.log(ctx.path);
console.log(ctx.session);
//if(ctx.state.xhr)
console.log("xhr: ", ctx.state.xhr);
//console.log("req: ",ctx.request.body);
ctx.body={data:ctx.request.body.fields,result:"ok",msg:"btc address saved successfully"};	
})
module.exports=p;
