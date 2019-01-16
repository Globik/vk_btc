var cl_del_zif = "pissoff";
var cl_ins_zif = "boo";
var cl_act_key ="act-key";
var max_cells = 8;
var spanout=gid("spanout");
spanout.value="";
var outi=gid("outi");
var dropBtc=gid("dropBtc");
var dropcheck=gid("dropcheck");
var sik=gid("tableBtcAmount");
var t_tbody=el_query('tbody');
var backSpace=el_queryd(dropBtc,".keypadBackspace");
var span_btc_min=el_query(".span-btc-min");
var span_btc_max=el_query(".span-btc-max");
var padinfo=gid("padinfo");
var keypad_lbl=elclass(dropBtc, 'keypad-lbl');
var backReset=el_query(".keypadReset");
var btc_maximum = 300;
var btc_minimum=0.0263;
var tdel = eltag("td");
var keypad_ev=false;
var keypad_default_btcsum=0.05;
var t_pointsign=0;
var keypad_max=false;
var keypad_min=false;
var current_number;
var back_str = "back";
var reset_str = "reset";
var ins_str = "ins";
var extrem_str = "extrem";
/* CUSTOM BTC INPUT */
function on_btc_keyboard(event){
var keyname=event.key;
if(keyname=='Control'){
clog("Control");
return;	
}
if(event.ctrlKey){
clog('combination of ctrlKey '+keyname);	
}else{
if(keyname==0||keyname==1||keyname==2||keyname==3||keyname==4||keyname==5||keyname==6||keyname==7||keyname==8||keyname==9||keyname=='.'){
transfer_zif(keyname);
}else if(keyname=='Backspace'){
transfer_back(keyname);
}else{clog("What the fuck?"+keyname);}
}	
}
function nett_zif(n){
var eli=el_queryd(dropBtc,'[data-zif="'+n+'"]');
if(eli){
class_adi(eli, cl_act_key);
}
}

var awevent=new CustomEvent('forinput',{bubbles:true, detail:{text:function(es){return es.target.value;},
typ:function(es){return es.target.getAttribute("data-typ");}}});

dropcheck.addEventListener('change', on_drop_btc,false);

function add_keypad_events(){
if(keypad_ev)return;
for(var i = 0; i < tdel.length; i++){
if(tdel[i])ad_event(tdel[i],'animationend',on_btc_ziffer);
}
for(var i = 0; i < keypad_lbl.length;i++){
if(keypad_lbl[i]){
ad_event(keypad_lbl[i],'click',transfer_zif);	
}	
}
if(backSpace)ad_event(backSpace,'click',transfer_back);
if(backReset)ad_event(backReset,'click',transfer_reset);
spanout.addEventListener('forinput', on_forinput, false);
ad_event(document, "keydown", on_btc_keyboard);
ad_event(dropBtc, "animationend", on_drop_red_btc);
keypad_ev=true;
}

function remove_keypad_events(){
if(!keypad_ev)return;
for(var i = 0; i < tdel.length; i++){
if(tdel[i])rem_event(tdel[i],'animationend', on_btc_ziffer);
}	
for(var i=0;i<keypad_lbl.length;i++){
if(keypad_lbl[i]){
rem_event(keypad_lbl[i],'click', transfer_zif);	
}	
}
spanout.removeEventListener('forinput', on_forinput);
rem_event(document, "keydown", on_btc_keyboard);
rem_event(dropBtc, 'animationend', on_drop_red_btc);
if(backSpace)rem_event(backSpace,'click', transfer_back);
if(backReset)rem_event(backReset,'click', transfer_reset);
keypad_ev=false;
}

function on_drop_red_btc(ev){
if(ev.animationName=="dropRed"){
clog("dropRed end!");
ev.target.className="";
}	
}

function on_btc_ziffer(ev){
if(!ev.animationName){alert("ev.animationName [animationend] doesn't work in this browser?");return;}
if(ev.animationName == "example2"){
ev.target.textContent = "";
class_remove(ev.target, cl_del_zif);
class_remove(ev.target, cl_ins_zif);
class_remove(backSpace, "act");
class_remove(backReset, "act");
}else if(ev.animationName == "example"){
var el4=el_query('[data-zif="'+ev.target.textContent+'"]');
if(el4){
class_remove(el4, cl_act_key);	
}
}else{}
}

function ins_zif(text, i){
if(tdel[i] && tdel[i].firstChild){
tdel[i].className="wboo";
class_adi(tdel[i].firstChild, cl_ins_zif);
tdel[i].firstChild.textContent = text;
}
}

function change_zif(new_content, index){
if(tdel[index] && tdel[index].firstChild){
tdel[index].firstChild.textContent = new_content;
}
}

function del_all_zif(){
for(var i = 0; i < tdel.length; i++){
if(tdel[i] && tdel[i].firstChild){

if(tdel[i].firstChild.textContent){
tdel[i].className="";
if(is_transform()){
class_adi(tdel[i].firstChild, cl_del_zif);
}else{
class_remove(tdel[i].firstChild, cl_ins_zif);
tdel[i].firstChild.textContent = "";	
}
}

}}
}



function del_zif(index){
if(tdel[index] && tdel[index].firstChild){
	tdel[index].className="";
if(is_transform()){
class_adi(tdel[index].firstChild, cl_del_zif);
}else{
class_remove(tdel[index].firstChild, cl_ins_zif);
tdel[index].firstChild.textContent = "";	
}
}	
}

var s_d=0;

function on_forinput(ev){
clog("forinput: "+ev.detail.text(ev));
var word = ev.detail.text(ev);
var leni = word.length;
clog("leni: "+leni);

var typ=ev.detail.typ(ev);
clog("type data: "+typ);
if(typ == ins_str){
if(leni==1){placeholdi.className="empty";}else if(leni==0){placeholdi.className="";}else{}
for(var i = 0; i < leni; i++){
ins_zif(word[i], i);
}
s_d+=13;
cursi.style.left=s_d+"px";
}else if(typ == back_str){
del_zif(leni);
if(leni==0){placeholdi.className="";}
s_d=s_d-13;
cursi.style.left=s_d+"px";
}else if(typ == extrem_str){
var cells_txt_len = get_cells_leni();
clog("length cells: "+ cells_txt_len);
for(var i = 0; i < leni; i++){
change_zif(word[i], i);
}
var len_step = cells_txt_len - leni;
var fact_len = leni + len_step;
for(var i = leni; i < fact_len; i++){
clog("there is"+ leni+" cursi: "+s_d);
if(tdel[i].firstChild.textContent) del_zif(i);
}

s_d=13*leni;
cursi.style.left=s_d+"px";
}else if(typ == reset_str){
del_all_zif();
if(leni==0)placeholdi.className="";
s_d=0;
cursi.style.left=s_d+"px";
}else{
clog("unknown type: "+typ);	
}
}

function get_cells_leni(){
var sc=0;
for(var i=0;i<max_cells;i++){
if(tdel[i] && tdel[i].firstChild){
if(tdel[i].firstChild.textContent){
sc++;	
}	
}	
}
return sc;	
}

function clear_act_key(){
if(is_transform()){
var eli2=el_queryd(dropBtc, ".keypad-lbl."+cl_act_key);
if(eli2){
class_remove(eli2, cl_act_key);	
}
}
}

function transfer_zif(el){
var sa;
if(el.target){
sa=el.target.getAttribute("data-zif");
if(!sa)return;
el.stopPropagation();
}else{
sa=el;
if(!sa)return;	
}
var el=sa;
if(is_transform())nett_zif(el);
if(el =="."){
t_pointsign+=1;
if(keypad_max){
clear_act_key();	
return;
}
}

if(spanout.value==btc_maximum.toString()){
clog("already maximum btc");
clear_act_key(el);
t_tbody.className="red";
class_adi(span_btc_max,"max");
class_remove(span_btc_min, "min");
padinfo.className="red";
padinfo.textContent="Oops. It's a maximum!";
dropBtc.className="red";
return;	
}
if(keypad_max || keypad_min)return;
var lenis=spanout.value.length;

if(lenis >= max_cells-1){
if(current_number < btc_minimum){
clog("in cells less then btc minimum. Show min val");//0.05 BTC??	
set_text(spanout, btc_minimum , extrem_str);
padinfo.textContent="It's a minimum!";
clear_act_key(el);
t_tbody.className= "green";
class_adi(span_btc_min, "min");
class_remove(span_btc_max, "max");
return;
}
}

if(lenis >= max_cells){
if(!current_number)return;
var fixed_num = current_number.toFixed(4);
clog("toFixed=> "+ fixed_num);
set_text(spanout, fixed_num, extrem_str);
padinfo.textContent="Fixed to "+ fixed_num + " bitcoins.";
clear_act_key(el);
t_tbody.className="green";
class_remove(span_btc_min, "min");
class_remove(span_btc_max, "max");
return;
}
padinfo.textContent="...";
padinfo.className="";
set_text(spanout, spanout.value + el, ins_str);

var num=fetch_number(spanout.value);
clog('num: '+num);
current_number = num;
if(isNaN(num)){
clear_act_key(el);
padinfo.textContent="Oops, not a valid one. Try again."
set_text(spanout, "", reset_str);
t_tbody.className="";
dropBtc.className="red";
t_pointsign = 0;
return;	
}
if(num > btc_maximum){
keypad_max = true;
set_text(spanout, btc_maximum, extrem_str);
clear_act_key(el);
}
if(num < btc_minimum){
clog("btc_minimum");
t_tbody.className="orange";
}
}

function inform_padinfo(n){
dropBtc.className="red";
padinfo.className="orange";
padinfo.textContent=n;	
}

function transfer_back(el){
if(el.target){el.stopPropagation();}
var a=spanout.value;
if(!a){
inform_padinfo("Nothing to be backspaced.");
return;
}
var b=a.slice(0,-1);
if(is_transform()){
class_adi(backSpace, "act");
}
set_text(spanout, b, back_str);
clear_padinfo("...");
}

function clear_padinfo(n){
class_remove(span_btc_min, "min");
class_remove(span_btc_max, "max");
t_tbody.className="";
padinfo.textContent=n;
padinfo.className="";
t_pointsign=false;
keypad_max=false;
keypad_min=false;	
}

function transfer_reset(el){
if(el.target){
el.stopPropagation();	
}
if(!spanout.value){
inform_padinfo("Nothing to clear.");
return;
}	
if(is_transform()){class_adi(backReset,"act");}
set_text(spanout, "", reset_str);
clear_padinfo("keypad");
}

function eltag(td){return dom_tagi("tableBtcAmount", td);}

function on_drop_btc(el){
clog("checked ", el.target.checked);
if(!el.target.checked){
remove_keypad_events();
dropBtc.style.display="none";	
wraptable.className="";
cursi.style.display="none";
class_remove(tregDown, "act");
}else{
dropBtc.style.display="block";
wraptable.className="focus";
cursi.style.display="block";
add_keypad_events();	
class_adi(tregDown,"act");
}
el.stopPropagation();
}

function set_text(el,content, typ){
el.setAttribute("data-typ", typ);	
el.value=content;
el.dispatchEvent(awevent);
}
/* END CUSTOM BTC INPUT */
/* Tab */
var formAdmin=gid("formAdmin");
var tabi=elclass(formAdmin, 'tabi');
var tabContenti=elclass(formAdmin, 'tab-contenti');
for(var i=0;i<tabi.length;i++){	
if(tabi[i])ad_event(tabi[i],"click",on_tabi_click);
}
function on_tabi_click(ev){
ev.stopPropagation();
var dataPartner=ev.target.getAttribute("data-typ");
if(dataPartner=="partner"){
class_remove(articleOwner,"active");
class_adi(articlePartner,"active");
}else if(dataPartner=="owner"){
class_remove(articlePartner,"active");
class_adi(articleOwner,"active");
}else{}
for(var i=0;i<tabi.length;i++){	
class_remove(tabi[i],"active");
}
if(!ev.target.classList.contains("active"))class_adi(ev.target,"active");
}
