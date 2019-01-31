
const sisi=`foo.foo({maria:"Mirabella",dj:"Bobo",suka:"FUCK",dima:"fuck"})`;

//foo((struct something){.maria="Mirabella",.dj="Bobo"}) - compound literals
var a=sisi.includes('({');//nice markers for obj in args  if only one func's arg
var b=sisi.includes('})');
console.log(a,b);

var reg=/{(.+?)}/;//looking for object
var found=reg.exec(sisi);
console.log('found: ',found);
//found[0],found[1],found.index
//found:  [ '{maria:"Mirabella",dj:"Bobo"}','maria:"Mirabella",dj:"Bobo"',index: 4,
var struct="(struct something)";
var fi=found[1].replace(/:/g,"=");
console.log("fi: ",fi);
var res=fi.split(",");
console.log("res: ",res);
var ti='';
var nmap=res.map(function(el,i){
console.log(el,i);	
//let b=el.replace(/"/g,'\\"');
//console.log("b: ",b);
return '.'+el;
})
console.log("map: ",nmap);
var warr=nmap.join(",");
console.log('warr: ',warr);

var das=found.input.slice(0,found.index);
console.log('das: ',das);
var das1=das+struct+'{'+warr+'})';
console.log('das1: ',das1);

let sa=das.match(/\w+\.\w+\b/g);
console.log("external module: ",sa);
let sa1=sa[0].split('.');//if sa not null
console.log('sa1: ',sa1);
if(sa1.length==2){
if(sa1[0]===sa1[1])console.log("yes, this is external module for inline function");	
}
