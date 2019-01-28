//var sisi=`n.nim?"da":"net"`;//2-1=1? && 1 entry
var sisi=`n&&n.du?"mi_du":n&&n.foo?ga():"li"`;//3-1=2? && 2entry
var a=sisi.includes("?");
var b=sisi.includes(":");
var vars=[];
var structi=[];
//var f=tos.match(/`([^`]+)`/);//fetch template literal
//var reg=/[^sw](n.\w+[^\?])+\?[^\?]/g;//looking for object n.*?
var reg=/[^sw]?(n\.\w+)\?/g;
if(a && b){
console.log("trenary ",a,b);
let c=sisi.split(":");
console.log(c,c.length);
let found2;var i=0;

while(found2=reg.exec(sisi)){
console.log("found2: ",found2);	
if(found2[1].startsWith("n."))structi.push(found2[1].substr(2));
//if(i==2)break;
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
structi.forEach(function(el,i){
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
