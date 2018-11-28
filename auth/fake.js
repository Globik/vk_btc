const LocalStrategy=require('passport-local').Strategy;
const find_target=(arr,id,m)=>new Promise((resolve, reject)=>resolve(arr.find(el=>el[id]==m)))
module.exports=function(fake_db,passport){
	
var fake_user_list=fake_db;
//[{uname:"Vadik", id:1, role:"admin", email:"fake@ya.ru", pwd:"pwd"}]

//find_target(fake_user_list,"uname","Vadik").then(d=>{console.log("user: ", d)})

passport.serializeUser(function pass_serialize(luser,done){
console.log('in serialize USERA: ',luser);
done(null,luser.id)
})

passport.deserializeUser(async function pass_deserialize(id,done){
console.log("from within deserializeUser")
try{
let us=await find_target(fake_user_list, "id", id);
done(null, us)
}catch(e){
done(e)
}
})

passport.use(new LocalStrategy({usernameField:'uname', passwordField:'password'}, async function do_loc_strat(uname,password,done){
console.log("loc strategy: ", uname, " ", password);
try{
let user=await find_target(fake_user_list, "uname", uname)
console.log("user in loc strat: ", user);
let bus=user;
if(!user){return done(null,false,{message:'Wrong user email or password!'})}
return done(null, bus,{message:'Erfolgreich loged in!!!'})
}catch(err){return done(err)} 

}))
}
