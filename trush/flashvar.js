// no need, i ll do it on server side
var parts=document.location.search.substr(1).split("&");
 //console.error("parts: ", parts);
 var flashvars={},curr;
for(var i=0;i<parts.length;i++){
	
curr=parts[i].split('=');
flashvars[curr[0]]=curr[1];	
var lk=(curr[0]=="api_result"? decodeURIComponent(curr[1]) : "");
var hashish=(curr[0]=="hash" ? decodeURIComponent(curr[1]) : "");
//api_result{"response":[{"uid":160441250,"first_name":"Сергей","last_name":"Шаболов"}]}
out.innerHTML+="<b>"+curr[0]+"</b>"+lk+"<br>"+"<span>"+curr[1]+"</span>"+hashish+"<br>"; 
}
if(curr[1]==undefined){buka=false;}
