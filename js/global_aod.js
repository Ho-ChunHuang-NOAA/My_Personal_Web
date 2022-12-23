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
var newdate;
var itmp;
var jtmp;
var ktmp;
var istatus;
var imax=72;
var nmodel=8;
var nmax=nmodel-1;
var dateStr;
var filename;
var latest_yr;
var latest_mon;
var latest_day;
var latest_ith;
var current_yr;
var current_mon;
var current_day;
var current_exp;
var current_var1;
var current_var2;
var current_cyl;
var current_area;
var first_julian_day=FirstDay();
var latest_julian_day=LatestDay();
var latest_calendar_day=jday2cald(latest_julian_day);
var noimage="https://www.emc.ncep.noaa.gov/mmb/hchuang/style/images/no_web_figure.png";
var norrfsimage="https://www.emc.ncep.noaa.gov/mmb/hchuang/style/images/rrfs-blank_image.png";
var blankimage="https://www.emc.ncep.noaa.gov/mmb/hchuang/style/images/web_blank_figure.png";

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

function get_mcday(year,month) {
   var ileap=isleapyear(year);
   var mcday = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
   var mon=month-1;
   var calday = (mcday[mon]/1);
   if ( ileap == 1 && mon == 1 ) calday++;
   return calday;
}

function get_mjday(year,month) {
   var ileap=isleapyear(year/1);
   var mjday = ["0", "31", "59", "90", "120", "151", "181", "212", "243", "273", "304", "334"];
   var mon=month-1;
   var jday = (mjday[mon]/1);
   if ( ileap == 1 && month > 2 ) jday++;
   return jday;
}

function dayofyear(year,month,day) {
   var jday;
   jday = get_mjday(year,month);
   jday = jday+(day/1);
   return jday;
}

function extract_year_from_calendarD(calendar_day) {
   var cnt=calendar_day%10000;
   var yr=(calendar_day-cnt)/10000;
   return yr;
}
function extract_day_from_calendarD(calendar_day) {
   var cnt=calendar_day%10000;
   var day=cnt%100;
   return day;
}
function extract_month_from_calendarD(calendar_day) {
   var day=extract_day_from_calendarD(calendar_day);
   var cnt=calendar_day%10000;
   var mon=(cnt-day)/100;
   return mon;
}
function extract_year_from_julianD(julian_day) {
   var cnt=julian_day%1000;
   var yr=(julian_day-cnt)/1000;
   return yr;
}
function extract_jday_from_julianD(julian_day) {
   var jday=julian_day%1000;
   return jday;
}
function extract_month_from_julianD(julian_day) {
   var maxjday;
   var yr=extract_year_from_julianD(julian_day);
   var jday=extract_jday_from_julianD(julian_day);
   for ( var mon=1; mon<13; mon++) {
      maxjday=get_mjday(yr,mon)/1+get_mcday(yr,mon)/1;
      if ( jday - maxjday <= 0 ) {
         return mon;
         break;
      }
   }
}

function extract_day_from_julianD(julian_day) {
   var yr=extract_year_from_julianD(julian_day);
   var jday=extract_jday_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   if ( mon == 1 ) {
      var day = jday;
   }
   else {
      var day=jday-get_mjday(yr,mon)/1;
   }
   return day;
}

function jday2cald(julian_day) {
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var calendar_day=yr*10000+mon*100+day;
   return calendar_day;
}

function cald2jday(calendar_day) {
   var yr=extract_year_from_calendarD(calendar_day);
   var mon=extract_month_from_calendarD(calendar_day);
   var day=extract_day_from_calendarD(calendar_day);
   var jday=dayofyear(yr,mon,day);
   jday=yr*1000+jday;
   return jday;
}

function julian_day_plus1(julian_day) {
   var new_day;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var ileap=isleapyear(yr);
   if ( mon == 12 && day == 31 ) {
      yr++;
      new_day=yr*1000+1;
   }
   else {
      new_day=julian_day+1;
   }
   return new_day;
}

function julian_day_plusN(julian_day, nadd) {
   var new_day;
   var rday;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var jdaymax=get_mjday(yr,mon);

   new_day=julian_day/1+nadd/1;
   if ( new_day > jdaymax ) {
      yr++;
      rday=new_day/1-jdaymax/1;
      new_day=yr*1000+rday;
   }
   return new_day;
}

function julian_day_minus1(julian_day) {
   var new_day;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var ileap=isleapyear(yr);
   if ( mon == 1 && day == 1 ) {
      yr--;
      new_day=get_mjday(yr,12)/1+31;
      new_day=yr*1000+new_day;
   }
   else {
      new_day=julian_day-1;
   }
   return new_day;
}

function calendar_day_plus1(calendar_day) {
   var julian_day=cald2jday(calendar_day);
   var j_plus1=julian_day_plus1(julian_day);
   var new_day=jday2cald(j_plus1);
   return new_day;
}
function calendar_day_minus1(calendar_day) {
   var julian_day=cald2jday(calendar_day);
   var j_minus1=julian_day_minus1(julian_day);
   var new_day=jday2cald(j_minus1);
   return new_day;
}

function save_latest_date(year,month,day){
   latest_year=year;
   latest_mon=month;
   latest_day=day;
   current_year=year;
   current_mon=month;
   current_day=day;
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

function get_latest_day(){
   var j=latest_day;
   return j;
}

function save_current_date(year,month,day){
   current_year=year;
   current_mon=month;
   current_day=day;
   var xx=document.form1.yr.options[0].value;
   var yy=document.form1.mn.options[0].value;
   var zz=document.form1.dy.options[0].value;
   var index_yr=year-xx;
   var index_mn=month-yy;
   var index_dy=day-zz;
   document.form1.yr.selectedIndex=index_yr;
   document.form1.mn.selectedIndex=index_mn;
   document.form1.dy.selectedIndex=index_dy;
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

function get_current_day(){
   var j=current_day;
   return j;
}

function save_current_prod(exp,cycle,area,var1,var2) {
   current_exp=exp;
   current_cyl=cycle;
   current_area=area;
   current_var1=var1;
   current_var2=var2;
   return 0;
}

function get_current_exp(){
   var j=current_exp;
   return j;
}

function get_current_var1(){
   var j=current_var1;
   return j;
}

function get_current_var2(){
   var j=current_var2;
   return j;
}

function get_current_area(){
   var j=current_area;
   return j;
}

function get_current_cyl(){
   var j=current_cyl;
   return j;
}

  function myWin(){
    newWin = open ("https://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/global_aod.html", "displayWindow", "width=950,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }

  function myWindow(frm){
    dateStr=frm.yr.options[frm.yr.selectedIndex].value+frm.mn.options[frm.mn.selectedIndex].value+frm.dy.options[frm.dy.selectedIndex].value;
    newWin = open ("https://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/global_aod.html", "displayWindow", "width=950,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }

function ImageExist(url) {
   var img = new Image();
   img.onload = function () {
       return 0;
   }
   img.onerror = function() {
      return 1;
   }
   img.src = url;
}
function ImageExist2(url) {
   var img = new Image();
   img.src = url;
   return img.height !=0;
}

function UrlExist(url) {
   var adres = new XMLHttpRequest();
   adres.open('HEAD',url,false);
   adres.send();
   if ( adres.status == "404" ) {
      return false;
   } else {
      return true;
   }
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

function blankpage(){
   count--;
   pics[count] = new Image();
   pics[count].src = norrfsimage;
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
   if (i>nmax){
      i=0;
   }
   document.gefs_pm_image.src =  pics[i].src;
   document.cmaq_pm_image.src =  pics[i+nmodel].src;
   document.rrfs_pm_image.src =  pics[i+2*nmodel].src;
   document.gefs_aod_image.src =  pics[i+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[i+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[i+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[i+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[i+7*nmodel].src;
   document.null_image.src =  pics[i+8*nmodel].src;
   document.reggoesaod_image.src =  pics[i+9*nmodel].src;
   document.regviirsaod_image.src =  pics[i+10*nmodel].src;
   window.setTimeout("increase_i(); anim()", speed);
}
             
function animation(){
   if (i>nmax){
      i=0;
   }
   if (document.form2.timerBox.checked){
      document.gefs_pm_image.src =  pics[i].src;
      document.cmaq_pm_image.src =  pics[i+nmodel].src;
      document.rrfs_pm_image.src =  pics[i+2*nmodel].src;
      document.gefs_aod_image.src =  pics[i+3*nmodel].src;
      document.cmaq_aod_image.src =  pics[i+4*nmodel].src;
      document.rrfs_aod_image.src =  pics[i+5*nmodel].src;
      document.glbgoesaod_image.src =  pics[i+6*nmodel].src;
      document.glbviirsaod_image.src =  pics[i+7*nmodel].src;
      document.null_image.src =  pics[i+8*nmodel].src;
      document.reggoesaod_image.src =  pics[i+9*nmodel].src;
      document.regviirsaod_image.src =  pics[i+10*nmodel].src;
      anmiloop= window.setTimeout("increase_i(); animation()", speed);
      ith=i;
   }
   else {
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
   document.gefs_pm_image.src =  pics[ith].src;
   document.cmaq_pm_image.src =  pics[ith+nmodel].src;
   document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
   document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
   document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
   document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
}

function show(i){
   ith=i;
   document.gefs_pm_image.src =  pics[ith].src;
   document.cmaq_pm_image.src =  pics[ith+nmodel].src;
   document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
   document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
   document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
   document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
}

function next2(){
   ith=ith+1;
   if (ith > latest_ith) {
      alert('last memorized frame reached, can not go forward');
      ith=ith-1;
   }
   else {
      document.gefs_pm_image.src =  pics[ith].src;
      document.cmaq_pm_image.src =  pics[ith+nmodel].src;
      document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
      document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
      document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
      document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
      document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
      document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
      document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
      document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
   }
}

function prev2(){
   ith=ith-1;
   if (ith < 0) {
     alert('first memorized frame reached, can not go backward');
     ith=ith+1;
   }
   else {
      document.gefs_pm_image.src =  pics[ith].src;
      document.cmaq_pm_image.src =  pics[ith+nmodel].src;
      document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
      document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
      document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
      document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
      document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
      document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
      document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
      document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
   }
}

function next(){
   ith=ith+1;
   if(ith >= nmax) ith=nmax;
   document.gefs_pm_image.src =  pics[ith].src;
   document.cmaq_pm_image.src =  pics[ith+nmodel].src;
   document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
   document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
   document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
   document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
}

function prev(){
   ith=ith-1;
   if(ith < 0) ith=0;
   document.gefs_pm_image.src =  pics[ith].src;
   document.cmaq_pm_image.src =  pics[ith+nmodel].src;
   document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
   document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
   document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
   document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
}

function rewind(){
   ith=0;
   document.gefs_pm_image.src =  pics[ith].src;
   document.cmaq_pm_image.src =  pics[ith+nmodel].src;
   document.rrfs_pm_image.src =  pics[ith+2*nmodel].src;
   document.gefs_aod_image.src =  pics[ith+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[ith+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[ith+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[ith+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[ith+7*nmodel].src;
   document.null_image.src =  pics[ith+8*nmodel].src;
   document.reggoesaod_image.src =  pics[ith+9*nmodel].src;
   document.regviirsaod_image.src =  pics[ith+10*nmodel].src;
}

function last(){
   ith=nmax;
   get_i();
   document.gefs_pm_image.src =  pics[i].src;
   document.cmaq_pm_image.src =  pics[i+nmodel].src;
   document.rrfs_pm_image.src =  pics[i+2*nmodel].src;
   document.gefs_aod_image.src =  pics[i+3*nmodel].src;
   document.cmaq_aod_image.src =  pics[i+4*nmodel].src;
   document.rrfs_aod_image.src =  pics[i+5*nmodel].src;
   document.glbgoesaod_image.src =  pics[i+6*nmodel].src;
   document.glbviirsaod_image.src =  pics[i+7*nmodel].src;
   document.null_image.src =  pics[i+8*nmodel].src;
   document.reggoesaod_image.src =  pics[i+9*nmodel].src;
   document.regviirsaod_image.src =  pics[i+10*nmodel].src;
}

function openWin(url) {
   newWin=window.open(url);
}

function reload(){
   open(this);
}

function load_image(frm){
   count=0;
   var newdate;
   var tmpdate;
   var obsfhd;
   var glbobsfhd;
   var regobsfhd;
   var gefsvar1;
   var cmaqvar1;
   var rrfsvar1;
   var gefsvar2;
   var cmaqvar2;
   var rrfsvar2;
   var exp=frm.exp.options[frm.exp.selectedIndex].value;
   var var1=frm.fld1.options[frm.fld1.selectedIndex].value;
   var var2=frm.fld2.options[frm.fld2.selectedIndex].value;
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var yr=frm.yr.options[frm.yr.selectedIndex].value;
   var mon=frm.mn.options[frm.mn.selectedIndex].value;
   var day=frm.dy.options[frm.dy.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var calendar_day=yr+mon+day;
   var julian_day=cald2jday(calendar_day);
   var layer;
   var mcday=get_mcday(yr,mon);
   var rcheck;
   if ( day > mcday ) {
      alert("Figure for date selected   "+yr+"  "+mon+"  "+day+"   is not available");
   }
   else {
      if ( julian_day < first_julian_day || julian_day > latest_julian_day ) {
         alert("Figure for date selected   "+yr+"  "+mon+"  "+day+"   is not available");
      }
      else {
         layer="k1";
         if ( var1 == "pm25" ) {
             gefsvar1="pm25";
             cmaqvar1="pm25";
             rrfsvar1="pm25";
         }
         if ( var2 == "aod" ) {
             gefsvar2="aod";
             cmaqvar2="aod";
             rrfsvar2="aod";
         }
         dateStr=yr+mon+day;
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+".sfc.f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"obs."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar1+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar1+"."+layer+".png";
            // filename=norrfsimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/gefs."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+gefsvar2+"."+layer+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar2+"."+layer+".f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar2+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar2+"."+layer+".png";
            filename=norrfsimage;
            preload(filename);
         }
         glbobsfhd="glb";
         regobsfhd="aqm";
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".t"+cycle+"z.aod."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/null."+area+".g16."+newdate+"."+data+".aod.high.png";
            // url="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/null."+area+".g16."+newdate+"."+data+".aod.high.png";
            filename=blankimage;
            // checkurl=UrlExist(url);
            // if ( checkurl ) {
            //   filename=url; 
            //   alert(url+" found");
            // } else {
            //   alert("Use Blank Page");
            // }
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         istatus=save_current_date(yr,mon,day);
         istatus=save_current_prod(exp,cycle,area,var1,var2);
         if ( cycle == "00" ) {
            show(6);
         }
         if ( cycle == "06" ) {
            show(4);
         }
         if ( cycle == "12" ) {
            show(2);
         }
         if ( cycle == "18" ) {
            show(0);
         }
      }
   }
}

function load_image_latest(){

   count=0;
   var obsfhd;
   var glbobsfhd;
   var regobsfhd;
   var gefsvar1;
   var cmaqvar1;
   var rrfsvar1;
   var gefsvar2;
   var cmaqvar2;
   var rrfsvar2;
   var img = new Image();
   var new_yr=extract_year_from_julianD(latest_julian_day);
   var new_mon=extract_month_from_julianD(latest_julian_day);
   var new_day=extract_day_from_julianD(latest_julian_day);
   var exp=get_current_exp();
   var var1=get_current_var1();
   var var2=get_current_var2();
   var area=get_current_area();
   var cycle=get_current_cyl();
   var layer;
   if ( area == "" ) {
      area="conus";
   }
   if ( var1 == "" ) {
      var1="pm25";
   }
   if ( var2 == "" ) {
      var2="aod";
   }
   if ( exp == "" ) {
      exp="prod";
   }
   if ( cycle == "" ) {
      cycle="06";
   }
   layer="k1";
   if ( var1 == "pm25" ) {
       gefsvar1="pm25";
       cmaqvar1="pm25";
       rrfsvar1="pm25";
   }
   if ( var2 == "aod" ) {
       gefsvar2="aod";
       cmaqvar2="aod";
       rrfsvar2="aod";
   }
   chr_yr=Num2Chr(new_yr);
   chr_mon=Num2Chr(new_mon);
   chr_day=Num2Chr(new_day);
   dateStr=chr_yr+chr_mon+chr_day;
   for (k=3; k<=24; k+=3) {
      data=Num2Chr(k);
      filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+".sfc.f0"+data+".png";
      preload(filename);
   }
   for (k=3; k<=24; k+=3) {
      data=Num2Chr(k);
      filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"obs."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar1+"."+layer+".png";
      preload(filename);
   }
   for (k=3; k<=24; k+=3) {
      data=Num2Chr(k);
      filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar1+"."+layer+".png";
      // filename=norrfsimage;
      preload(filename);
   }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar2+"."+layer+".f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar2+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar2+"."+layer+".png";
            filename=norrfsimage;
            preload(filename);
         }
         glbobsfhd="glb";
         regobsfhd="aqm";
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/null."+area+".g16."+newdate+"."+data+".aod.high.png";
            filename=blankimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
   if ( cycle == "00" ) {
      show(6);
   }
   if ( cycle == "06" ) {
      show(4);
   }
   if ( cycle == "12" ) {
      show(2);
   }
   if ( cycle == "18" ) {
      show(0);
   }
   istatus=save_current_date(new_yr,new_mon,new_day);
}

function load_imageP1(frm){

   count=0;
   var obsfhd;
   var glbobsfhd;
   var regobsfhd;
   var obs_yr;
   var chr_oyr;
   var chr_yr;
   var chr_mon;
   var chr_day;
   var gefsvar1;
   var cmaqvar1;
   var rrfsvar1;
   var gefsvar2;
   var cmaqvar2;
   var rrfsvar2;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var day=get_current_day();
   var calendar_day=10000*(yr/1)+100*(mon/1)+(day/1);
   var julian_day=cald2jday(calendar_day);
   var new_julian_day= julian_day_plus1(julian_day);
   var new_calendar_day= jday2cald(new_julian_day);
   var new_yr=extract_year_from_julianD(new_julian_day);
   var new_mon=extract_month_from_julianD(new_julian_day);
   var new_day=extract_day_from_julianD(new_julian_day);
   var exp=frm.exp.options[frm.exp.selectedIndex].value;
   var var1=frm.fld1.options[frm.fld1.selectedIndex].value;
   var var2=frm.fld2.options[frm.fld2.selectedIndex].value;
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var layer;
   var mcday=get_mcday(new_yr,new_mon);
   if ( new_day > mcday ) {
      alert("McDay Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
   }
   else {
      if ( new_julian_day < first_julian_day || new_julian_day > latest_julian_day ) {
         alert("Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
      }
      else {
         layer="k1";
         if ( var1 == "pm25" ) {
            gefsvar1="pm25";
            cmaqvar1="pm25";
            rrfsvar1="pm25";
         }
         if ( var2 == "aod" ) {
            gefsvar2="aod";
            cmaqvar2="aod";
            rrfsvar2="aod";
         }
         chr_yr=Num2Chr(new_yr);
         chr_mon=Num2Chr(new_mon);
         chr_day=Num2Chr(new_day);
         dateStr=chr_yr+chr_mon+chr_day;
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/gefs."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+gefsvar1+"."+layer+".png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+"."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+".sfc.f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"obs."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar1+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar1+"."+layer+".png";
            // filename=norrfsimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/gefs."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+gefsvar2+"."+layer+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar2+"."+layer+".f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar2+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar2+"."+layer+".png";
            filename=norrfsimage;
            preload(filename);
         }
         glbobsfhd="glb";
         regobsfhd="aqm";
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".t"+cycle+"z.aod."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".t"+cycle+"z.aod."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/null."+area+".g16."+newdate+"."+data+".aod.high.png";
            filename=blankimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         istatus=save_current_date(chr_yr,chr_mon,chr_day);
         istatus=save_current_prod(exp,cycle,area,var1,var2);
      }
   }
   if ( cycle == "00" ) {
      show(6);
   }
   if ( cycle == "06" ) {
      show(4);
   }
   if ( cycle == "12" ) {
      show(2);
   }
   if ( cycle == "18" ) {
      show(0);
   }
}
function load_imageM1(frm){

   count=0;
   var obsfhd;
   var glbobsfhd;
   var regobsfhd;
   var obs_yr;
   var chr_oyr;
   var chr_yr;
   var chr_mon;
   var chr_day;
   var gefsvar1;
   var cmaqvar1;
   var rrfsvar1;
   var gefsvar2;
   var cmaqvar2;
   var rrfsvar2;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var day=get_current_day();
   var calendar_day=(10000*yr/1)+(100*mon/1)+day/1;
   var julian_day=cald2jday(calendar_day);
   var new_julian_day= julian_day_minus1(julian_day);
   var new_calendar_day= jday2cald(new_julian_day);
   var new_yr=extract_year_from_julianD(new_julian_day);
   var new_mon=extract_month_from_julianD(new_julian_day);
   var new_day=extract_day_from_julianD(new_julian_day);
   var exp=frm.exp.options[frm.exp.selectedIndex].value;
   var var1=frm.fld1.options[frm.fld1.selectedIndex].value;
   var var2=frm.fld2.options[frm.fld2.selectedIndex].value;
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var layer;
   var mcday=get_mcday(new_yr,new_mon);
   if ( new_day > mcday ) {
      alert("McDay Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
   }
   else {
      if ( new_julian_day < first_julian_day || new_julian_day > latest_julian_day ) {
         alert("Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
      }
      else {
         layer="k1";
         if ( var1 == "pm25" ) {
            gefsvar1="pm25";
            cmaqvar1="pm25";
            rrfsvar1="pm25";
         }
         if ( var2 == "aod" ) {
            gefsvar2="aod";
            cmaqvar2="aod";
            rrfsvar2="aod";
         }
         chr_yr=Num2Chr(new_yr);
         chr_mon=Num2Chr(new_mon);
         chr_day=Num2Chr(new_day);
         dateStr=chr_yr+chr_mon+chr_day;
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/gefs."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+gefsvar1+"."+layer+".png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+"."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar1+".sfc.f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"obs."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar1+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar1+"."+layer+".png";
            // filename=norrfsimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/gefs."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+gefsvar2+"."+layer+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+dateStr+"/gefs."+area+"."+dateStr+".t"+cycle+"z."+gefsvar2+"."+layer+".f0"+data+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp+"."+dateStr+".t"+cycle+"z."+data+"."+cmaqvar2+"."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            data=Num2Chr(k);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+".v70c22obs."+dateStr+".t"+cycle+"z."+data+"."+rrfsvar2+"."+layer+".png";
            filename=norrfsimage;
            preload(filename);
         }
         glbobsfhd="glb";
         regobsfhd="aqm";
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".t"+cycle+"z.aod."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/gsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+glbobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            // filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".t"+cycle+"z.aod."+layer+".f0"+data+".png";
            filename="https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/"+newdate+"/vsthq."+area+"."+newdate+".0"+data+".aod."+layer+".png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            // filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/null."+area+".g16."+newdate+"."+data+".aod.high.png";
            filename=blankimage;
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".g16."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         for (k=3; k<=24; k+=3) {
            itmp=cycle/1+k;
            if ( itmp >= 72 ) {
               itmp=itmp-72;
               tmpdate=calendar_day_plus1(dateStr);
               tmpdate=calendar_day_plus1(tmpdate);
               newdate=calendar_day_plus1(tmpdate);
            }
            else {
               if ( itmp >= 48 ) {
                  itmp=itmp-48;
                  tmpdate=calendar_day_plus1(dateStr);
                  newdate=calendar_day_plus1(tmpdate);
               }
               else {
                  if ( itmp >= 24 ) {
                     itmp=itmp-24;
                     newdate=calendar_day_plus1(dateStr);
                  }
                  else {
                     newdate=dateStr;
                  }
               }
            }
         
            obs_yr=extract_year_from_calendarD(newdate);
            chr_oyr=Num2Chr(obs_yr);
            data=Num2Chr(itmp);
            filename="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_oyr+"/"+newdate+"/"+regobsfhd+"."+area+".viirs."+newdate+"."+data+".aod.high.png";
            preload(filename);
         }
         istatus=save_current_date(chr_yr,chr_mon,chr_day);
         istatus=save_current_prod(exp,cycle,area,var1,var2);
      }
   }
   if ( cycle == "00" ) {
      show(6);
   }
   if ( cycle == "06" ) {
      show(4);
   }
   if ( cycle == "12" ) {
      show(2);
   }
   if ( cycle == "18" ) {
      show(0);
   }
}

function get_i(){
 i=ith;
} 
