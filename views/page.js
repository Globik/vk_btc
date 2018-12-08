const page=n=>{
return `<html><head><title>vk app page</title>
<script src="https://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
</head><body>
<a href="/lapi">api</a>&nbsp;|&nbsp;<a href="/">home</a>
<h1>It's a page</h1></body>
<button onclick="dowas();">click me</button>
<script>

function dowas(){
if(VK){
try{
//alert("VK.suka: "+JSON.stringify(VK));
VK.callMethod("setLocation","fucker");
}catch(e){alert(e);}
//VK.callMethod('showGroupSettingsBox',64);
VK.callMethod('resizeWindow',1000, 1000);//ideal
}else{alert("no vk");}
}

/*
window.addEventListener('message',function(event){
	console.log('message came 222222222page');
console.log(event.data,' ',event);
event.source.postMessage("fuck", event.origin);	
}, false);
*/ 
</script>
</html>`;
}
module.exports={page}
