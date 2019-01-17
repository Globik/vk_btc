var gl_debug=0;// if a need to debug
var is_transformly=false;
(function(){if(typeof window.CustomEvent==="function")return false;
function CustomEvent(event,p){
var evt;
var pr=p || {bubbles:false,cancelable:false,detail:undefined};
evt=document.createEvent("CustomEvent");
evt.initCustomEvent(event,pr.bubbles,pr.cancelable,pr.detail);
return evt;	
}
CustomEvent.prototype=window.Event.prototype;
window.CustomEvent=CustomEvent;	
})();

function clog(n){
if(gl_debug==0){console.log(n);}}
function is_transform(){return is_transformly;}
function is_transi(){
var div=document.createElement("div");
div.setAttribute("style","transform:translateY(-10px);");
document.body.appendChild(div);
var ws=!!(div.style["transform"]);
is_transformly=ws;
div.parentNode.removeChild(div);
div=null;
}
function fetch_number(str){
try{
var g_num_s=Number(str);	
return g_num_s;
}catch(er){clog(er);return undefined;}
}
function ad_event(obj,name,funci){obj.addEventListener(name,funci,false);}
function rem_event(obj,name,funci){obj.removeEventListener(name,funci);}
function eltagi(str){return document.getElementsByTagName(str);}
function gid(id){return document.getElementById(id);}
function el_query(n){return document.querySelector(n);}
function el_queryd(elid, n){return elid.querySelector(n);}

function elclass(elid, n){return elid.getElementsByClassName(n);}
function dom_tagi(id,s){
var el_n=gid(id);
if(!el_n)return null;
var el_nu=el_n.getElementsByTagName(s);
if(!el_nu)return null;
return el_nu;	
}
function class_adi(node,clas){if(!node){clog("wrong node el?");return;}
if(node.classList){node.classList.add(clas);}	
}
function class_remove(node,clas){
if(!node){clog("wrong node el?");return;}
if(!node.classList){clog("no classList in el?");return;}
node.classList.remove(clas);
}
