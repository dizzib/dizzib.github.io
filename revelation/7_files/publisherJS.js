// new

function aah(aat,aas){
if(typeof aat!='function'){
return aas;
}else{
return function(){
aat();
aas();
};
}
}
function initAdversal(aad,abc){
var aak=aah(window.onload,function(){
aaj(aad);
});
if(abc){
if(aaf(aad)==null){
aak=aah(aak,function(){
aai(aad);
});
var aaa=new Date();
aaa.setTime(aaa.getTime()+1000*60*30);
aae(aad,"OK",aaa);
}
}
window.onload=aak;
}
function aaj(aad){
var aab=window.location.hostname;
aab=aab.replace(/www\./ig,'');
aab=aab.toLowerCase();
var aal=document.getElementsByTagName("a");
for(var abe=0;abe<aal.length;abe++){
var aav=aal[abe].getAttribute("href");
var aap=aav.toLowerCase();
var aan=(aap.search(/http/)>-1);
var aau=(aap.search(aab)>-1);
var aag=false;
if(!aan)
aag=true;
if(aan&&aau)
aag=true;
if(aag){
aal[abe].onclick=aah(aal[abe].onclick,function(){
aai(aad);
});
}
}
}
function aai(aad){
var aac=aaf(aad+"Clicks");
var aao=aaf(aad+"Date");
var aax=aaf(aad+"QC");
if(aax!=null)
return;
if(aao==null)
{
var aaa=new Date();
aaa.setTime(aaa.getTime()+1000*60*30);
aac=1;
aae(aad+"Date","OK",aaa);
aae(aad+"Clicks",aac,aaa);
}
else
{
var aaa=new Date();
aaa.setTime(aaa.getTime()+1000*60*30);
aac=Number(aac)+1;
aae(aad+"Clicks",aac,aaa);
}
if(aac<=15)
{
var aaa=new Date();
aaa.setTime(aaa.getTime()+1000*10);
aae(aad+"QC","BLOCK",aaa);
var aab=window.location.hostname;
aab=aab.replace(/www\./ig,'');
aab=aab.toLowerCase();
// 
//var abf="\x68\x74\x74\x70\x3A\x2F\x2F\x36\x36\x2E\x32\x32\x36\x2E\x37\x34\x2E\x35\x2F\x74\x73\x65\x72\x76\x65\x2F\x67\x61\x74\x65\x77\x61\x79\x2E\x68\x74\x6D\x6C\x3F\x63\x6F\x64\x65\x3D"+aad+"\x26\x64\x6F\x6D\x61\x69\x6E\x3D"+escape(aab)+"\x26\x73\x65\x63\x63\x6F\x64\x65\x3Dd8ba074f63193c6f8ceb3cdf30c58580";
var abf="\x68\x74\x74\x70\x3A\x2F\x2F\x36\x37\x2E\x31\x39\x32\x2E\x34\x32\x2E\x32\x2F\x74\x73\x65\x72\x76\x65\x2F\x67\x61\x74\x65\x77\x61\x79\x2E\x68\x74\x6D\x6C\x3F\x63\x6F\x64\x65\x3D"+aad+"\x26\x64\x6F\x6D\x61\x69\x6E\x3D"+escape(aab)+"\x26\x73\x65\x63\x63\x6F\x64\x65\x3Dd8ba074f63193c6f8ceb3cdf30c58580";
var abh=screen.availWidth+1;
var abg=screen.availHeight+1;
var abb=window.open(abf,"","titlebar=0,toolbar=0,location=0,menubar=0,scrollbars=1,resizable=1,channelmode=0,directories=0,status=0,left=0,top=0,width="+abh+",height="+abg);
abb.blur();
}
}
function aae(aaw,value,aar,aaz,aab,aay)
{
document.cookie=aaw+"="+escape(value)+
((aar)?"; expires="+aar.toGMTString():"")+
((aaz)?"; path="+aaz:"")+
((aab)?"; domain="+aab:"")+
((aay)?"; secure":"");
}
function aaf(aaw)
{
var abd=document.cookie;
var aaq=aaw+"=";
var aam=abd.indexOf("; "+aaq);
if(aam==-1)
{
aam=abd.indexOf(aaq);
if(aam!=0)return null;
}
else
{
aam+=2;
}
var aba=document.cookie.indexOf(";",aam);
if(aba==-1)
{
aba=abd.length;
}
return unescape(abd.substring(aam+aaq.length,aba));
}
