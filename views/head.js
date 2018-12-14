const {jsLoader, cssLoader}=require('../myutils/css_js_loader.js');
const head=function(n){
return `<!-- head.js --><meta charset="UTF-8"><title>${n.title?n.title:"vk btc"}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
${n.meta?n.meta:""}
<link rel="shortcut icon" type="image/ico" href="/img/w4.png">
${n.css?cssLoader(n.css):""}
${n.csshelper ? `<style>${n.csshelper}</style>`:""}
<script src="/js/globik.js"></script>
${n.js?jsLoader(n.js):""}
${n.jshelper ? `<script>${n.jshelper}</script>`:""}
<!--[if lt IE9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<!--[if lt IE9]><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
<!-- end head.js -->`;	
}
module.exports={head}
