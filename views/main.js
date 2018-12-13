const main=n=>{
return `<html><head><title>vk app</title>
<style>

body{background:red;height:auto;display:block;position:relative;margin:0;padding:0;}
/* iframe max height 4050px */
#vkMain{display:block;position:relative;background:pink;height:auto;max-height:4050px;overflow-y:scroll;}
#out{display:block;border:5px solid green;
white-space:pre-wrap;
word-break:break-word;
overflow-wrap: break-word;
height:auto;
/*overflow: scroll; 28.5*/
}

#out span{background:yellow;padding:2px;margin:2px;}
</style>
<script src="https://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
<script type="text/javascript">
var out;
var buka=false;
window.onload=on_vk_btc_init;

function on_vk_btc_init(evi){
//alert(JSON.stringify(evi.target));//OK for window global stuff => evi.target.location etc
//alert('isTrusted: '+evi.isTrusted);// true or false
out=document.getElementById("out");
var sbody=document.getElementById('sbody');
//alert('w: '+sbody.clientHeight+' '+sbody.clientWidth+' '+window.innerWidth);
VK.init(vk_init_success, vk_init_fails, '5.92');	
}
VK.addCallback('onWindowResized', function(w,h){
alert(w+' '+h);
})
function vk_init_success(){
out.innerHTML+="<b>w width:</b>"+window.innerWidth+' '+document.documentElement.clientWidth+' '+window.pageXOffset;
out.innerHTML+=' '+document.documentElement.offsetLeft;
out.innerHTML+=' '+out.offsetLeft+' '+document.documentElement.offsetWidth+' '+out.offsetWidth+"";
out.innerHTML+='<b>body:</b>'+sbody.offsetWidth+' '+sbody.clientWidth+' '+sbody.offsetLeft+' ';
console.log("out: ", out);
//VK.addCallback('onGroupSettingsChanged', on_group_settings_changed);
//VK.callMethod("showGroupSettingsBox", 64);
//VK.callMethod('resizeWindow',1000, 1000);
/*
VK.addCallback("onLocationChanged", function f(location){
alert("location :"+location);	
});*/ 
}

function vk_init_fails(){
//out.innerHTML="vk_init failed.";
alert("vk init failed!");
}

function on_group_settings_changed(flag, token){
alert("group change "+flag+" "+token);
//flag=64, token=  token for rights=>  each time diffrent
out.innerHTML+="<br>"+"flag: "+flag+"<br>"+"token: "+token;
}


//window.onorientationchange=on_window_resize;//window top???
</script>
</head><body  id="sbody"><main id="vkMain">

<a href="/page#fucker=mother">page</a><h1>vk app</h1>
<h4>${n.user?n.user.id:"no"}&nbsp;${n.user? n.user.uname : ""}&nbsp;${n.user? n.user.ufa:""}</h4>
<div>${n.session?n.session:""}</div>
<a href="#popa">popa</a>&nbsp;<button onclick="resize_was();">test resize</button>&nbsp;
<button onclick="get_prev_widget();">test widget</button>&nbsp;
<div id="out"></div>
<div id="popa">popa</div>


</main>
<script>
function on_loc(el){console.log("on location changed");}
VK.addCallback("onLocationChanged", on_loc);

function resize_was(){
	var out_el=document.getElementById("out");
	var c_out_el=window.getComputedStyle(out_el);
	//alert("h: "+c_out_el.getPropertyValue('height')+" off: " +out_el.offsetHeight+"scr: "+out_el.scrollHeight);
	var rect=out_el.getBoundingClientRect();
	console.log("rect: ", rect);
	var s_a=out_el.offsetHeight+rect.y;//perfec
	//alert(c_out_el.getPropertyValue('margin-top'));
	console.log("height: ",out_el.offsetHeight);//height
	console.log("pageYOffset: ", window.pageYOffset);
	//out_el.style.position="absolute";
	console.log("scrollTop: ",out_el.scrollTop);
	console.log("position: ", c_out_el.getPropertyValue('padding-top'));
	console.log(out_el.pageY);
	console.log(out_el.clientHeight," ",out_el.clientTop);
	console.log("w height: ", window.innerHeight);
//VK.callMethod('resizeWindow',1000, s_a);
//var b_a=window.innerHeight + out_el.offsetHeight;
//alert(b_a);
//VK.callMethod('resizeWindow',1000,b_a);
var sbody_s=document.getElementById('sbody');
var c_body=window.getComputedStyle(sbody_s);
var suka=c_body.getPropertyValue('height');//
//+" "+s_a);
//alert(window.innerHeight+' '+window.outerHeight+" "+sbody.offsetHeight+' '+sbody.clientHeight);
console.log("w innH: ",window.innerHeight,'w outerH: ',window.outerHeight,"body offsetH: ",sbody.offsetHeight,'body clientH ',sbody.clientHeight);
console.log("dock ",document.documentElement.clientHeight,'scree.height: ',window.screen.height);
//VK.callMethod('resizeWindow',1000, sbody.offsetHeight);//udovlit
//sbody.style.minHeight="290px";
sbody.style.background="yellow";
//sbody.style.overflow="auto";
//window.top.style.overflow="scroll";
VK.callMethod('resizeWindow',1000, document.documentElement.clientHeight);//ideal
//if == 4000
console.log('buka: ',buka);
if(buka==false){
var vl=document.getElementById("vkMain");
var c_vl=window.getComputedStyle(vl);
var r_c_vl=c_vl.getPropertyValue('height');
console.log("main height: ", r_c_vl);
console.log('main h: ',vl.clientHeight);
VK.callMethod('resizeWindow',1000, vl.clientHeight);//ideal
}
}
function get_prev_widget(){
var a={};
a.title="buy";
a.text="hallo text rrrrrr";

try{var b=JSON.stringify(a);}catch(e){console.log(e);
return;	
}

VK.addCallback('onAppWidgetPreviewFail', on_prev_widget_fail);
VK.addCallback('onAppWidgetPreviewCancel', on_prev_widget_cancel);
VK.addCallback('onAppWidgetPreviewSuccess', on_prev_widget_success);
//VK.callMethod('showAppWidgetPreviewBox','text','return {"title":"buy","text":"hello, text! ==bold text=="};');	

VK.callMethod('showAppWidgetPreviewBox','text','return '+b+';');	
}
function on_prev_widget_fail(d,d2){
alert(d,d2);	
remove_prev_widget();
}
function on_prev_widget_cancel(){
alert(this._inited);
console.log("this ", this);
remove_prev_widget();
}
function on_prev_widget_success(){
alert(this);
remove_prev_widget();
}
function remove_vk_event(arr, cb){
for(var i=0;i<arr.length;i++){
console.log('remove: ', arr[i], ' ', cb[i]);	
VK.removeCallback(arr[i], cb[i]);
}	
}
function remove_prev_widget(){
remove_vk_event(['onAppWidgetPreviewFail','onAppWidgetPreviewCancel','onAppWidgetPreviewSuccess'], 
[on_prev_widget_fail, on_prev_widget_cancel, on_prev_widget_success]);	
}
</script>

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
 * secret=c******31f& 3a1a57c782 different
 * access_token=8724d7f*********************************8f91402d8fdd17bbed74c551bab50361
 * access_token: 833cd23dadca43699b0c3e9873c7bdfd47caa007acaa875399c265e6f696a5dc06aad32e31756c58338b2 different
&user_id=0
* &group_id=174003077
* &is_app_user=1
* &auth_key=c4828a92e**********b630bf71c24
* auth_key: c4828a92ee7a***120fb630bf71c24 the same by reloading
* &language=0
* &parent_language=0
* &is_secure=1
* &stats_hash=078b0*****87e9926
* &ads_app_id=6753809_692******1fed6b9e   6753809_db52c118e6e098b0b8 the same when session and reloading
* &api_result=%7B%22response%22%3A%5B%7B%22
* uid%22%3A160441250%2C%22
* first_name%22%3A%22%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%22%2C%22
* last_name%22%3A%22%D0%A8%D0%B0%D0%B1%D0%BE%D0%BB%D0%BE%D0%B2%22%7D%5D%7D
* &referrer=unknown
* &lc_name=3553232a&sign=28d4************************201009a2b512e893b800267fc6a5985b2da6abacdaf77
* &hash=
* sign: 07e082a6d33d34bcbfca66caf36e09ac1cf9c6ac066c432f49e7118c6dfeed1a
* sign 27982281cc496d06a3efd27a89ec6612f82bd9e86c46be9a2578587867be495b //different
* $secret = secret key app
* $sig=$secret ? hash_hmac('sha256', $sign, $secret):"";
*/
