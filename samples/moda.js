const submoda=require('./submoda.js');
var is_suka=true;
const fucker=function(n){
return `<h1>${n.istrue}</h1><b>${is_suka?"da,suka!":""} ${submoda.submoda()}</b>`;
}

var sym=Symbol.for('sym');
module.exports={fucker,[sym]:{is_suka:'bool',istue:'bool',sub_child:['submoda',submoda.submoda.name,submoda.submoda.toString()]}};
//() ({}) (n)
