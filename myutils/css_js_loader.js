function jsLoader(n){
let s='';
if(Array.isArray(n)){
s+=formi_js(n);	
}else{
s+=get_js(n)	
}
return s;	
}
function cssLoader(n){
let s='';
if(Array.isArray(n)){
s+=formi_css(n);	
}else{
s+=get_stylesheet(n)	
}
return s;
}
module.exports={jsLoader, cssLoader}
function formi_css(n){
let s='';
n.forEach(function(el,i){s+=get_stylesheet(el);});
return s;	
}
function formi_js(n){
let s='';
n.forEach(function(el,i){s+=get_js(el);})
return s;	
}
function get_stylesheet(l){return `<link href="${l}" rel= "stylesheet">`;}
function get_js(l){return `<script src="${l}"></script>`;}
