const seti=new Set();
var sup_str="Suka    fucker mothofucker .  Hi";
//const sisi=`nim_suka?"da":"net"`;//2-1=1? && 1 entry
//const sisi=`n&&n.du?"mi_du":n&&n.foo?ga():"li"`;//3-1=2? && 2entry
//const sisi=`n.same===2222?"m":n.same==false?"d":"nd"`;
//const sisi=`n.same=="join"?"join":n.same=="leave"?"leave":n.same=="out"?"out":"nothing"`;
//const sisi=`n.m?n.m.msg:""`;
var admin="admin_main_menu";
const sisi=`n.user&&n.user.role=="admin"?admin_main_menu.admin_main_menu(n):""`;
// n.user&&!strcmp(n.user.role,"admin")?admin_main_menu(n):""
var a=sisi.includes("?");
var b=sisi.includes(":");
var vars=[];
var structi=[];
//var f=tos.match(/`([^`]+)`/);//fetch template literal
//var reg=/[^sw](n.\w+[^\?])+\?[^\?]/g;//looking for object n.*?
//const reg=/[^sw]?(n\.\w+)\?/g;//1 && 2
//const reg=/[^sw]?(n\.\w+)\s*?(==|>|>=|<=|<)?\s*.+?\?/g;
//const reg=/[^sw]?(n\.\w+)\s*[=><]?\s*.*?\?/g;//2 and 3 optimal for 3 types of sisi
//const reg=/[^sw]?(n\.\w+)\s{0,4}?[<>=]?\s*(\S{0,9})?\s{0,3}?\?/g;//2 and 3 fuck
const reg=/[^sw]?(n\.\w*\.?\w+)(?:!?==?=?|[<>]=?)?[-a-zA-Z0-9."']{0,10}\?/g;
if(a && b){
console.log("trenary ",a,b);
let c=sisi.split(":");
console.log(c,c.length);
let found2;var i=0;

while(found2=reg.exec(sisi)){
console.log("found2: ",found2);	
if(found2[1].startsWith("n.")){structi.push(found2[1].substr(2));seti.add(found2[1].substr(2));}
if(i==4)break;
i++;
}

let found=sisi.match(reg);
if(found)console.log("found: ",found);	
//c.forEach(function(el,i){})
/*
let d=c[c.length-2];
let e=d.split("?");
if(e.includes("n.")){
structi.push(e.substr(0,2));	
}
*/ 
}


console.log("structi: ",structi);


function to_struct(){
let s='struct n{';
seti.forEach(function(el,i){
s+="char*"+el+";";	
})	
s+='};';
return s;
}



function doo(n){
return `Main. ${n&&n.du?"mi_du":n&&n.foo?ga():"li"}`;	
}
console.log(doo(/*{du:false,foo:false}*/));
function ga(){return "what?";}
function toc(l){
return `${l.struct}
struct kore_buf*func(struct n){
struct kore_buf*b=kore_buf_alloc(128);
kore_buf_appendf(b,"something: {l.buki}",{arrijoin()});
return b;
}
	`;
}
let data=toc({struct:to_struct()});
console.log("data: ",data);
var sup_str_res=sup_str.replace(/\s*/g,"");
console.log(sup_str_res);

/*
let sa=sisi.match(/\b(admin_main_menu)\b/g);
let suka2=sisi.includes("admin_main_menu");
console.log('suka2 ',suka2);
console.log("external module: ",sa);
let sa1=sa[0].split('.');//if sa not null
console.log('sa1: ',sa1);
if(sa1.length==2){
if(sa1[0]===sa1[1])console.log("yes, this is external module for inline function");	
}*/
//split for submodules functions
var j=sisi.split("?");
console.log('j: ',j);
j.forEach(function(el,i){
if(el.includes(":")){
console.log("here is :",el)
if(is_func(el)){
console.log("It is a function! What type? Wait.");
console.log("Type of func is: ",func_type(el));	
check_dot_func(el);
}else{console.log("not a func");}

}
})
function is_func(str){return str.includes(")")?true:false;}
function func_type(str){
if(str.includes("()")){
//let f=str.match(/\w+\(n?\)/g);
//console.log('f: ',f);	
return "noarg";	
}else if(str.includes("(n)")){
//name_func(n) - compound literals
return "defarg";
}else if(str.includes("({})")){
return "emptob";	
}else if(str.includes("({")&&str.includes("})")){
return "fulob";	
}else{return "nothing";}	
}
function check_dot_func(str){
let s='';
if(str.includes(".")){
let a=str.split(".");
console.log('a: ',a);
a.forEach(function(el,i){
console.log('el: ',el);	
})	
}else{
console.log("it's a private func=> ",str);
let f=str.match(/\w+\(n?({.+})?\)/g);
console.log('f: ',f);	
}	
return s;
}
