const page=n=>{
return `<html><head><title>vk app page</title>
<script src="https://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
</head><body>
<a href="/lapi">api</a>&nbsp;|&nbsp;<a href="/">home</a>
<h1>It's a page</h1>
<h3>widget type text</h3>
<form name="wid">
<p><input type="text" name="title" value="title2" placeholder="suka"></p>
<p><textarea name="textarea">hello, mir</textarea></p>
<p><input type="submit" name="wtText" value="submit"/></p>
</form>
<button onclick="update_widget();">update widget</button>
<h2>w</h2>
<button onclick="dowas();">click me</button>
</body>
<script>

function dowas(){
if(VK){
alert("there's vk");

try{
//alert("VK.suka: "+JSON.stringify(VK));
//VK.callMethod("setLocation","fucker");
}catch(e){alert(e);}
//VK.callMethod('showGroupSettingsBox',64);
//VK.callMethod('resizeWindow',1000, 1000);//ideal
}else{alert("no vk");}
}
var f=document.forms.wid;
if(f){
f.onsubmit=proc_txt_submit;	
}
function proc_txt_submit(e){
e.preventDefault();
//alert(e.target.title.value);	
var a={};
a.title=e.target.title.value;
a.text=e.target.textarea.value;
try{
var b=JSON.stringify(a);
}catch(e){alert(e);return;}
get_prev_widget(b);
}
//alert(f.submit.value);
/*
window.addEventListener('message',function(event){
	console.log('message came 222222222page');
console.log(event.data,' ',event);
event.source.postMessage("fuck", event.origin);	
}, false);
*/ 

function get_prev_widget(json_obj){
VK.addCallback('onAppWidgetPreviewFail', on_prev_widget_fail);
VK.addCallback('onAppWidgetPreviewCancel', on_prev_widget_cancel);
VK.addCallback('onAppWidgetPreviewSuccess', on_prev_widget_success);
//alert('uid: '+this.Args.uid);
VK.callMethod('showAppWidgetPreviewBox','text','return {"title":"buy "+Args.uid+"","text":"hello,"+Args.lang+" text! ==bold text=="};');	
//VK.callMethod('showAppWidgetPreviewBox','text','return '+json_obj+';');	
}
function update_widget(){
	//VK.callMethod("appWidgets.update", "text",'return {"title":"titki'+Args.uid+'","text":"some text param "};');//on server side??
}
function on_prev_widget_fail(d,e){
alert(d+' '+e);	
remove_prev_widget();
}
function on_prev_widget_cancel(d){

remove_prev_widget();
}
function on_prev_widget_success(){
alert("success!");
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
</html>`;
}
module.exports={page}
