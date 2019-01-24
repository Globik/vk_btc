var fucker=require('./moda.js');
var figi=false;
function doo(){return 3;}
var sisi=`foo({maria:"Mirabella", is_word:figi})`;
var reg=/{(.+?)}/;//looking for object
var found=reg.exec(sisi);
console.log('found: ',found);
//found[0],found[1],found.index
//found:  [ '{maria:"Mirabella",dj:"Bobo"}','maria:"Mirabella",dj:"Bobo"',index: 4,
var struct="(struct something)";
var fi=found[1].replace(/:/g,"=");
console.log("fi: ",fi);

var s="figi";
var s2="doo();";
console.log(eval(s));
const isbool=val=>'boolean'===typeof val;
const isfunc=val=>'function'===typeof val;
console.log('is_bool: ',isbool(eval(s)));
console.log('is func: ',isfunc(doo));
var sa=fi.split(',');
console.log("sa: ",sa);

sa.forEach(function(el,i){
let a=el.split("=");
console.log('a: ',a);
let b=a[1].startsWith('"');//startswidth endswith family must be here
let bo=a[1].endsWith('"');
console.log('is string?: ',b,bo);
if(!b && !bo){
let c=isbool(eval(a[1]));
//console.log('a[1]: ',a[1]);
console.log('is bool: ',c);	
let d=a[1].includes('(');
let e=a[1].includes(')');
console.log('is_func: ',d,e);
}
})
/*
var wantw=fucker.fucker({istrue:figi});
console.log("from moda: ",wantw);
*/ 
var obi=Object.getOwnPropertyNames(fucker);
console.log('obi: ',obi);
console.log('obi.sym: ',obi.sym);

var ob=Object.getOwnPropertySymbols(fucker);
console.log('is there symbols: ',ob);
console.log('and symbol value: ',fucker[Symbol.for("sym")]);
//console.log('and: ',Symbol.keyFor("sym"))


var q=Symbol('q');
let user={name:"fucker",[q]:true}
console.log('user: ',user[q]);


let name=Symbol.for('suka');
var li=Symbol.for('suka');
//[name]="a";
var fr={[name]:"a"}
console.log('li: ',li,fr["suka"]);






















