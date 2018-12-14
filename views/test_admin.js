var head=require('./head');
const test_admin=function(n){
return `<!DOCTYPE html><html lang="en">
<head>${head.head({title:"admin panel", css:["/css/globik.css"]})}
<style>
form{width:50%;}
input{height:2.9rem;}
input[type=text]{font-weight:500;font-size:initial;width:100%;}
input[type=submit], input[type=reset]{font-weight:bold;font-size:initial;}
input[type=submit]{width:50%;}
input[type=reset]{width:50%;}
label{line-height:1.8;font-weight:bolder;}
.green_span{color:green;}

input[type=text].wait{animation-name: btc_inp_adr;animation-duration: 1s;animation-iteration-count:infinite;
	animation-direction:alternate-reverse;
	background-color:inherit;}
@keyframes btc_inp_adr{
from{background-color:inherit;}
to{background-color:rgba(255,127,80,0.9);}	
}
@media screen and (max-width:690px){
body{/*background:green;*/}
form{width:60%;}
}
</style>
</head>
<body>
<h2>btc address control</h2>
<form action="/testSavebtcaddress" name="btcForm" method="post" enctype="multipart/form-data">
<h3>App admin</h3>
<p>
<label id="lbtc" for="fuck">Your btc address:</label><br><!-- addr.length 34 1HCviLYNqHAyeZxGTj9Mtgvj1NJgQuSo91 -->
<input id="fuck"  type="text" name="btcad" maxlength="34" spellcheck="false" placeholder="your btc address"
 value="39cjjxHTu7344mXExKb5SoDzbAoDWBBpCj9" required autocomplete="off" oninvalid=""/>
 <input type="hidden" name="username" value="vadik"/>
 <input type="hidden" name="acc" value="assae45"/>
</p>
<p>
<input name="reset" type="Reset"/><input name="submit" type="submit" value="Save"/>
</p>
</form>
</body>
<script>
var btcForm=document.forms.btcForm;
if(btcForm){
btcForm.addEventListener('submit',on_btc_submit_form, false);	
btcForm.addEventListener('reset',on_btc_reset, false);
}
function on_btc_submit_form(ev){
if(!supportFormData()) return;
ev.preventDefault();
var d=new FormData(ev.target);
var f2=ev.target.btcad;
var f3=ev.target.submit;
vax(ev.target.method,ev.target.action,d,form_btc_ondata, onerror,ev,true);
f3.disabled=true;
if(f2){
f2.className="wait";
}
}
function onerror(er){console.log('error: ',er);}
function form_btc_ondata(data, e){
console.log('result: ', data);	
//console.log(JSON.stringify(data));
if(data.msg){
var span=document.createElement("span");
span.textContent="\t"+data.msg;
span.className="green_span";
insert_after(span, lbtc,"span");
}
//console.warn(e.target.btcad.value);
var f2=e.target.btcad;
if(f2)f2.className="";
}
function on_btc_reset(ev){
var f3=ev.target.submit;
if(f3)f3.disabled=false;	
del_after(lbtc, "span");
}
</script>
</html>
`;
}
module.exports={test_admin}
