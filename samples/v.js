var sid=require('./moda.js');
var si=sid.fucker;
//var si=function(n){return `me ${n.tu}."${n.dura}" number to ${fuck(8)}`;}
	
var obj={m:si}
	console.log("FUNC: ",obj.m.toString().replace('function (n)','struct kore_buf*'+obj.m.name+'(struct n)'));
	console.log(obj.m.name,obj.m.arguments);
	var tos=obj.m.toString();//fetch a string from function
	console.log("TOS: ", tos);
	var f=tos.match(/`([^`]+)`/);//fetch template literal
	console.log("` ` matches: ",f[1]);
	var esc=/\${(.+?)}/g;
	
	var tmp_f=f[1];var dolls=[];var suki=[];var buki='';
	var f2;
	var bi=0;
	while(
	f2=esc.exec(f[1])//find immediate expressions
	){
	console.log("in dollar: ",f2);
	let a=f2.input.replace(f2[0],"%s");
	
	console.log("A: ", a);
	dolls.push(f2[1]);
	//console.log('part doll: ', f2[1].substr(1));
	//console.log("start string: ", tmp_f.substr(0,f2.index));
	//let ds=f[1].slice(bi,f2.index);
	let ds=a.slice(bi,f2.index+2);
	console.log("ds :",ds);
	
	//let suka=a.substr(0,f2.index+2);
	//suki.push(suka);
	buki+=ds;//+"%s";
	bi=f2.index+f2[0].length;
	//tmp_f.replace(f2[0],"FUCKER");
}
console.log("dolls len: ", dolls.length);
console.log("dolls: ", dolls);
console.log("suki: ", suki);
console.log("buki: ",buki);
console.log("tmp_f: ", tmp_f);
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
console.log("is struct?: ",r4);
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
function temp(str,...k){
var result=[str[0]];
k.forEach(function(el,i){
result.push(el,str[i+1]);	
})
console.log(result);	
}

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
function arrijoin(){
//console.log(eval(dolls[2]));
return dolls.join(',');
}

function fuck(n){
return n;	
}
console.log(obj.m({dura:"Masha",tu:"Du"}));
/*
function fetch_keys_lineal(){
let s='';
dolls.forEach(function(el,i){
s+=	
})
return s;	
}*/
var sisi="var du;let me=5;doo('stringi');function fuck(n){return n;} funck(6)";
//var reg=//g;
console.log("SISI: ",sid.fucker);
