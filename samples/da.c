#include <string.h>
#include <stdio.h>

struct user{
char*role;
int a;	
};


struct main_data{
char*site_name;
int id;
struct user buser;	
};
char*admin_main_menu(struct main_data n){
char *s="admin";
char *s2="user";
printf("site_name: %s\n",n.site_name?n.site_name:"no site name");
printf("n.id: %d\n",n.id);
printf("data.buser.role: %s\n",n.buser.role?n.buser.role:"no");
printf("data.buser.a: %d\n",n.buser.a);


//const sisi=`n.same=="join"?"join":n.same=="leave"?"leave":n.same=="out"?"out":"nothing"`;
printf("Yes, gits user width role %s\n",
n.buser.role&&!strcmp(n.buser.role,"admin")?"ADMIN":n.buser.role&&!strcmp(n.buser.role,"superuser")?
"SUPERUSER":n.buser.role&&!strcmp(n.buser.role,"fucker")?"FUCKER":"GUEST");
printf("ROLE: %s\n",n.buser.role);

return s2;
}
int main(){
struct user luser;
luser.a=1000;
luser.role="fucker";
admin_main_menu((struct main_data){.site_name="atarikuMerindaaMerabellla",.buser.role="admin",.buser.a=777}); 
printf("***\n");
admin_main_menu((struct main_data){.site_name="fucker",.buser.role="superuser",.buser.a=888}); 
printf("***\n");
admin_main_menu((struct main_data){.site_name="alice",.buser=luser}); 
printf("***\n");
admin_main_menu((struct main_data){.site_name="luckyStrike"});
return 0;
}
/*
 gcc -o da da.c 
 */
