//global functions ajax etc
function insert_after(newnode, refnode,tagname){
try{
del_after(refnode, tagname);
refnode.parentNode.insertBefore(newnode,refnode.nextSibling);
}catch(e){console.log(e);}
}
function del_after(refnode, tagname){
if(refnode.nextSibling.tagName==tagname.toUpperCase())refnode.parentNode.removeChild(refnode.nextSibling);	
}
function vax(m,u,d,o,z,pointer,bool){
var x=new XMLHttpRequest();if(!x){return;}x.open(m,u);
x.setRequestHeader('Cache-Control','no-cache');
if(!bool){x.setRequestHeader('Content-Type','application/json','utf-8');}x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
x.onload=function(e){
//alert('mu '+this.responseText);
x.status==200?o(demiss(this.response || this.responseText),pointer):z(this.response || this.responseText,pointer)};
x.onerror=z;if(!bool){var v=miss(d);x.send(v);}else{x.send(d)}}
function miss(n){var a;try{a=JSON.stringify(n);return a;}catch(er){console.log(er);return null;}}
function demiss(n){var b;try{b=JSON.parse(n);return b;}catch(er){console.log(er);return null;}}
function gid(id){return document.getElementById("id");}
function supportFormData(){return !! window.FormData;}
