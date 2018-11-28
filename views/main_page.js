const main_page=n=>{
return `<html><head><title>main page</title></head><body>
<a href="/page">logout</a>&nbsp;|&nbsp;<a href="/logout">page</a>
<h1>main page</h1>
<h3>user: ${n.user ? JSON.stringify(n.user) : n.user}</h3>
<h3>login</h3>
<form method="post" action="/login">
<p><input type="text" name="uname" value="Vadik"/></p>
<p><input type="text" name="password" value="pwd"/></p>
<p><input type="submit" value="submit"></p>
</form>
<output>
<h3>some data</h3>
<p>
${n.some_data}</p>
</output>
</body></html>`;	
}
module.exports={main_page}
