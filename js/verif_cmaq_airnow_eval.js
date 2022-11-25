var pics=new Array();
var count=0;
var i=0;
var ith=0;
var speed=1000;
var data="";
var k;
var dateStr;
var filename="";
var findtime;
var itmp;
var jtmp;
var ktmp;
var istatus;
var imax=22;
var nmodel=22;
var nmax=nmodel-1;
var dateStr;
var filename;
var latest_yr;
var latest_mon;
var latest_ith;
var current_yr;
var current_mon;
var current_stats;
var current_cyl;
var current_area;
var current_caseid;
var current_spec;
var area_in;
var area_out;
var input_first_mon=Firstmon();
var input_latest_mon=Latestmon();


function Num2Chr(parin) {
   var j;
   if (parin <=9) {
      j="0"+parin;
   }
   else {
      j=parin.toString();
   }
   return j;
}

function isleapyear(year) {
   var ileap=0;
   if (year%4 == 0) {
      ileap=1;
      if ( (year%100 == 0) && (year%400 != 0) ) ileap=0;
   }
   return ileap;
}

function extract_year(input_mon) {
   var cnt=input_mon%100;
   var yr=(input_mon-cnt)/100;
   return yr;
}
function extract_month(input_mon) {
   var mon=input_mon%100;
   return mon;
}
function mon_plus1(input_mon) {
   var yr=extract_year(input_mon);
   var mon=extract_month(input_mon);
   if ( mon == 12 ) {
      yr++;
      new_mon=yr*100+1;
   }
   else {
      new_mon=input_mon+1;
   }
   istatus=save_current_date(yr, new_mon);
   return new_mon;
}

function mon_minus1(input_mon) {
   var yr=extract_year(input_mon);
   var mon=extract_month(input_mon);
   if ( mon == 1 ) {
      yr--;
      new_mon=yr*100+12;
   }
   else {
      new_mon=input_mon-1;
   }
   istatus=save_current_date(yr, new_mon);
   return new_mon;
}
function save_latest_date(year,month){
   latest_year=year;
   latest_mon=month;
   current_year=year;
   current_mon=month;
   return 0;
}

function get_latest_year(){
   var j=latest_year;
   return j;
}

function get_latest_month(){
   var j=latest_mon;
   return j;
}

function save_current_date(year,month){
   current_year=year;
   current_mon=month;
   var xx=document.form1.yr.options[0].value;
   var yy=document.form1.mn.options[0].value;
   var index_yr=year-xx;
   var index_mn=month-yy;
   document.form1.yr.selectedIndex=index_yr;
   document.form1.mn.selectedIndex=index_mn;
   return 0;
}

function get_current_year(){
   var j=current_year;
   return j;
}

function get_current_month(){
   var j=current_mon;
   return j;
}

function save_current_prod(stats,cycle,area,caseid,spec) {
   current_stats=stats;
   current_cyl=cycle;
   current_area=area;
   current_caseid=caseid;
   current_spec=spec;
   return 0;
}

function get_current_stats(){
   var j=current_stats;
   return j;
}

function get_current_cyl(){
   var j=current_cyl;
   return j;
}

function get_current_area(){
   var j=current_area;
   return j;
}

function get_current_caseid(){
   var j=current_caseid;
   return j;
}

function get_current_spec(){
   var j=current_spec;
   return j;
}

  function myWin(){
    newWin = open ("http://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/verif_hysplit_dust.html", "displayWindow", "width=950,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }

  function myWindow(frm){
    dateStr=frm.yr.options[frm.yr.selectedIndex].value+frm.mn.options[frm.mn.selectedIndex].value+frm.dy.options[frm.dy.selectedIndex].value;
    newWin = open ("http://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/verif_hysplit_dust.html", "displayWindow", "width=800,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }
function preload2(img){
    if ( count > imax ) {
       for (var k=1; k<=imax; k++ ) {
          pics[k-1].src = pics[k].src;
       }
       count=imax;
    }
    else {
       pics[count] = new Image();
    }
    pics[count].src = img;
    count++;
}

function preload(img){
     pics[count] = new Image();
     pics[count].src = img;
     count++;
}

function get_speed(frm){
  if(frm.elements["spd"].selectedIndex == 0) speed=400;
  if(frm.elements["spd"].selectedIndex == 1) speed=100;
  if(frm.elements["spd"].selectedIndex == 2) speed=1000;
  return speed;
}

function increase_i(){
   i++;
   return i;
}

function anim(){
     if(i>nmax){
       i=0;
     }
     document.cmaq_airnow_image.src =  pics[i].src;
     window.setTimeout("increase_i(); anim()", speed);
}
             
function animation(){
     if(i>nmax){
       i=0;
     }
     if(document.form2.timerBox.checked){
       document.cmaq_airnow_image.src =  pics[i].src;
       anmiloop= window.setTimeout("increase_i(); animation()", speed);
       ith=i;
     }
     else{
       return;
     }
}

function show2(i){
   ith=i;
   if (ith < nmax) {
      latest_ith=ith;
   }
   else {
      latest_ith=imax;
   }
   document.cmaq_airnow_image.src = pics[ith].src;
}

function show(i){
   ith=i;
   document.cmaq_airnow_image.src = pics[ith].src;
}

function next2(){
   ith=ith+1;
   if(ith > latest_ith) {
     alert('last memorized frame reached, can not go forward');
     ith=ith-1;
   }
   else {
      document.cmaq_airnow_image.src = pics[ith].src;
   }
}

function prev2(){
   ith=ith-1;
   if (ith < 0) {
     alert('first memorized frame reached, can not go backward');
     ith=ith+1;
   }
   else {
      document.cmaq_airnow_image.src = pics[ith].src;
   }
}

function next(){
   ith=ith+1;
   if(ith >= nmax) ith=nmax;
   document.cmaq_airnow_image.src = pics[ith].src;
}

function prev(){
   ith=ith-1;
   if(ith < 0) ith=0;
   document.cmaq_airnow_image.src = pics[ith].src;
}

function rewind(){
   ith=0;
   document.cmaq_airnow_image.src = pics[ith].src;
}

function last(){
   ith=nmax;
   get_i();
   document.cmaq_airnow_image.src = pics[ith].src;
}

function openWin(url) {
   newWin=window.open(url);
}

function reload(){
   open(this);
}

function load_image(frm){
   count=0;
   var yr=frm.yr.options[frm.yr.selectedIndex].value;
   var mon=frm.mn.options[frm.mn.selectedIndex].value;
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var caseid=frm.fld.options[frm.fld.selectedIndex].value;
   var spec=frm.spec.options[frm.spec.selectedIndex].value;
   var stats=frm.stats.options[frm.stats.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var calendar_mon=100*(yr/1)+(mon/1);
   if ( caseid == "" ) {
      caseid="CMAQV5P6";
   }
   if ( cycle == "" ) {
      cycle="06Z";
   }
   if ( calendar_mon < input_first_mon || calendar_mon > input_latest_mon ) {
      alert("Figure for month  selected   "+yr+"  "+mon+"   is not available");
   }
   else {
      dateStr=yr+mon;
      if ( stats == "DIURNAL" || stats == "RMSEDL" || stats == "MEDL" ) {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      } else {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY1_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      }
      istatus=save_current_date(yr,mon);
      istatus=save_current_prod(stats,cycle,area,caseid,spec);
      show(0);
   }
}

function load_image_latest(){

   count=0;
   var img = new Image();
   var new_yr=extract_year(input_latest_mon);
   var new_mon=extract_month(input_latest_mon);
   var area=get_current_area();
   var caseid=get_current_caseid();
   var spec=get_current_spec();
   var stats=get_current_stats();
   var cycle=get_current_cyl();
   if ( area == "" ) {
      area="FULL";
   }
   if ( caseid == "" ) {
      caseid="CMAQV5P6";
   }
   if ( cycle == "" ) {
      cycle="06Z";
   }
   chr_yr=Num2Chr(new_yr);
   chr_mon=Num2Chr(new_mon);
   dateStr=chr_yr+chr_mon;
   if ( stats == "DIURNAL" || stats == "RMSEDL" || stats == "MEDL" ) {
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
      preload(filename);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
      preload(filename);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
      preload(filename);
   } else {
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY1_"+cycle+"_"+dateStr+".png";
      preload(filename);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
      preload(filename);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
      preload(filename);
      }
   istatus=save_current_date(chr_yr,chr_mon);
   show(0);
}

function load_imageP1(frm){

   count=0;
   var chr_yr;
   var chr_mon;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var calendar_mon=100*(yr/1)+(mon/1);
   var new_mon= mon_plus1(calendar_mon);
   var new_yr=extract_year(new_mon);
   var new_mon=extract_month(new_mon);
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var caseid=frm.fld.options[frm.fld.selectedIndex].value;
   var spec=frm.spec.options[frm.spec.selectedIndex].value;
   var stats=frm.stats.options[frm.stats.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var check_mon=100*(new_yr/1)+(new_mon/1);
   if ( caseid == "" ) {
      caseid="CMAQV5P6";
   }
   if ( cycle == "" ) {
      cycle="06Z";
   }
   if ( check_mon < input_first_mon || check_mon > input_latest_mon ) {
      chr_msg=Num2Chr(check_mon);
      alert("Figure for month selected   "+chr_msg+"   is not available");
      chr_yr=Num2Chr(yr);
      chr_mon=Num2Chr(mon);
      istatus=save_current_date(chr_yr, chr_mon);
      show(0);
   }
   else {
      chr_yr=Num2Chr(new_yr);
      chr_mon=Num2Chr(new_mon);
      dateStr=chr_yr+chr_mon;
      if ( stats == "DIURNAL" || stats == "RMSEDL" || stats == "MEDL" ) {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      } else {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY1_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      }
      istatus=save_current_date(chr_yr, chr_mon);
      istatus=save_current_prod(stats,cycle,area,caseid,spec);
      show(0);
   }
}
function load_imageM1(frm){

   count=0;
   var chr_yr;
   var chr_mon;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var calendar_mon=100*(yr/1)+(mon/1);
   var new_mon= mon_minus1(calendar_mon);
   var new_yr=extract_year(new_mon);
   var new_mon=extract_month(new_mon);
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var caseid=frm.fld.options[frm.fld.selectedIndex].value;
   var spec=frm.spec.options[frm.spec.selectedIndex].value;
   var stats=frm.stats.options[frm.stats.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var check_mon=100*(new_yr/1)+(new_mon/1);
   if ( caseid == "" ) {
      caseid="CMAQV5P6";
   }
   if ( cycle == "" ) {
      cycle="06Z";
   }
   if ( check_mon < input_first_mon || check_mon > input_latest_mon ) {
      chr_msg=Num2Chr(check_mon);
      alert("Figure for month selected   "+chr_msg+"   is not available");
      chr_yr=Num2Chr(yr);
      chr_mon=Num2Chr(mon);
      istatus=save_current_date(chr_yr, chr_mon);
      show(0);
   }
   else {
      chr_yr=Num2Chr(new_yr);
      chr_mon=Num2Chr(new_mon);
      dateStr=chr_yr+chr_mon;
      if ( stats == "DIURNAL" || stats == "RMSEDL" || stats == "MEDL" ) {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      } else {
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY1_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY2_"+cycle+"_"+dateStr+".png";
         preload(filename);
         filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/"+area+"_"+caseid+"_"+spec+"_"+stats+"_DAY3_"+cycle+"_"+dateStr+".png";
         preload(filename);
      }
      istatus=save_current_date(chr_yr,chr_mon);
      istatus=save_current_prod(stats,cycle,area,caseid,spec);
      show(0);
   }
}

function get_i(){
 i=ith;
} 
