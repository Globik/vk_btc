const main=n=>{
return `<html><head><title>vk app</title>
<style>
body{background:red;}
#out{display:block;border:5px solid green;position:relative;width:normal;padding:0;margin:0;
white-space:pre-wrap;
word-break:break-word;
overflow-wrap: break-word;
/*height:500px;*/
overflow: scroll;

}
#out span{background:yellow;padding:2px;margin:2px;}
</style>
<script src="https://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
<script type="text/javascript">
var out;
window.onload=(function(){
out=document.getElementById("out");
VK.init(function(){
//alert('success '+document.location.search);	
//alert(window.location.search);
 var parts=document.location.search.substr(1).split("&");
 var flashvars={},curr;
for(var i=0;i<parts.length;i++){
curr=parts[i].split('=');
flashvars[curr[0]]=curr[1];	
var lk=(curr[0]=="api_result"? decodeURIComponent(curr[1]) : "");
//api_result{"response":[{"uid":160441250,"first_name":"Сергей","last_name":"Шаболов"}]}
out.innerHTML+="<b>"+curr[0]+"</b>"+lk+"<br>"+"<span>"+curr[1]+"</span><br>"; 
}
try{
//out.textContent=JSON.stringify(flashvars);

//out.style
}catch(e){alert(e);}
VK.addCallback('onGroupSettingsChanged',function(e, token){
	alert("group change "+e+" "+token);
	// e=64, token=  token for rights=>  e2efc1dca2bf0c52d0636c270c9c8c8069b6aca2d7b8c49cb3658f9573ce046d4f3cbc10856575ff4ac19
	
	out.innerHTML+="<br>"+"e: "+e+"<br>"+"token: "+token;
	});
VK.callMethod("showGroupSettingsBox", 64);
},function(){
//alert('fails');	
out.innerHTML="fails";
},'5.92');	
})
</script>
</head><body><h1>vk app</h1>
<div id="out"></div>
</body></html>`;
}
module.exports={main}

/*
 * first request to API = >
 * => method=getProfiles&uids{viewer_id}&format=json&v=2.0
 * 
https://my_app_local.ru:8000/api?
 api_url=https://api.vk.com/api.php&api_id=67**809&
 api_settings=1&viewer_id=160**1250&
 * viewer_type=4&
 * sid=eb6bd485219f1146e147******************************************f205c097d16f1f3d3c1e5c23c&
 * secret=c******31f&
 * access_token=8724d7f*********************************8f91402d8fdd17bbed74c551bab50361
&user_id=0
* &group_id=174003077
* &is_app_user=1
* &auth_key=c4828a92e**********b630bf71c24
* &language=0
* &parent_language=0
* &is_secure=1
* &stats_hash=078b0*****87e9926
* &ads_app_id=6753809_692******1fed6b9e
* &api_result=%7B%22response%22%3A%5B%7B%22
* uid%22%3A160441250%2C%22
* first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22
* last_name%22%3A%22%D0%A8%D0%B0%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%22%7D%5D%7D
* &referrer=unknown
* &lc_name=3553232a&sign=28d4************************201009a2b512e893b800267fc6a5985b2da6abacdaf77
* &hash=
* sign: 07e082a6d33d34bcbfca66caf36e09ac1cf9c6ac066c432f49e7118c6dfeed1a
* $secret = secret key app
* $sig=$secret ? hash_hmac('sha256', $sign, $secret):"";
*/
