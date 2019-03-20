const main_page=n=>{
return `<html><head><title>main page</title></head><body>
<a href="/logout">logout</a>&nbsp;|&nbsp;<a href="/page">page</a>&nbsp;|&nbsp;<a href="/lapi">vk app</a>&nbsp;|
<a href="/testAdmin">testAdmin</a>
<h1>main page</h1>
<h3>user: ${n.user ? JSON.stringify(n.user) : n.user}</h3>
<h3>login</h3>
<form method="post" action="/login">
<p><input type="text" name="uname" value="Vadik"/></p>
<p><input type="text" name="password" value="pwd"/></p>
<p><input type="submit" value="submit"></p>
</form>
<button onclick="alert(document.cookie);">cookies</button><br><br>
<button onclick="ajax();">test ajax</button>
<script>
function ajax(){
let xhr=new XMLHttpRequest();
xhr.open("POST","/testi");
xhr.setRequestHeader("Content-Type","application/json","utf-8");
xhr.onload=function(s){
if(xhr.status==200){
console.log(this.response);	
}else{console.log(this.response);}	
}
xhr.onerror=function(e){
console.error(e);	
}
let b={};
b.msg="hello";
xhr.send(JSON.stringify(b));	
}
</script>
<output>
<h3>some data</h3>
<p>
${n.some_data}</p>
</output>
</body></html>`;	
}
module.exports={main_page}
