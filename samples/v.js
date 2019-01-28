//var sid=require('./moda.js');
//var si=sid.fucker;
//var si=function(n){return `me ${n.tu}."${n.dura}" number to ${fuck(8)}`;}
function piska(n){
return `<h1>Hallo ${n.name}</h1>How are ${n.me} going? Trenary ${n.watch?n.watch:""}`;
}
var obj={m:piska};
function is_trenary(str){let a=str.includes(":"),b=str.includes("?");if(a&&b){return true;}return false;}
//console.log("FUNC: ",obj.m.toString().replace('function (n)','struct kore_buf*'+obj.m.name+'(struct n)'));
//console.log(obj.m.name,obj.m.arguments);
var tos=obj.m.toString();//fetch a string from function
//console.log("TOS: ", tos);
var f=tos.match(/`([^`]+)`/);//fetch template literal
//console.log("` ` matches: ",f[1]);
var esc=/\${(.+?)}/g;
var trenary_reg=/[^sw]?(n\.\w+)\?/g;
var found2;
var tmp_f=f[1];
var dolls=[];
var suki=[];
var buki='';
var f2;
var bi=0;
while(
f2=esc.exec(f[1])//find immediate expressions
){
console.log("in dollar: ",f2);
let a=f2.input.replace(f2[0],"%s");
console.log("A: ", a);
console.log('f2[1] ',f2[1]);
if(!is_trenary(f2[1])){
if(f2[1].startsWith("n."))dolls.push(f2[1]);
}else{
while(found2=trenary_reg.exec(f2[1])){
console.log("found2: ",found2);	
if(found2[1].startsWith("n."))dolls.push(found2[1]);
}



	
}
let ds=a.slice(bi,f2.index+2);
console.log("ds :",ds);
buki+=ds;
bi=f2.index+f2[0].length;
}
//console.log("dolls len: ", dolls.length);
//console.log("dolls: ", dolls);
//console.log("suki: ", suki);
//console.log("buki: ",buki);
//console.log("tmp_f: ", tmp_f);
function to_struct(){
let s='struct n{';
dolls.forEach(function(el,i){
if(el.includes("n.")){
let b=el.substring(2);
s+=`char*${b};`;	
}
})	
s+='};';
return s;
}
var r4=to_struct();
//console.log("is struct?: ",r4);
//function do_was(){}
	/*
struct n{char*s;}
struct kore_buf*si(struct n){
struct kore_buf*b=kore_buf_alloc(128);
kore_buf_appendf(b,"hello %s",n.s);
return b;	
//kore_free(b)
}
*/ 
/*
function temp(str,...k){
var result=[str[0]];
console.log('k ',k);
console.log("s ",str);
k.forEach(function(el,i){
result.push(el,str[i+1]);	
})
console.log('[result] ',result);	
return result.join('');
}
*/
function was(l){
return `${l.struct}
struct kore_buf*${l.name}(struct n){
struct kore_buf*b=kore_buf_alloc(128);
kore_buf_appendf(b,"somthing: ${l.buki}",${arrijoin()});
return b;
}
`;	
}
var dd=was({name:obj.m.name,struct:r4,buki:buki});
console.log("data str: ",dd);
function arrijoin(){return dolls.join(',');}
function fuck(n){return n;}
console.log('obj.m: ', obj.m({name:"Masha",watch:true,me:"you"}));
