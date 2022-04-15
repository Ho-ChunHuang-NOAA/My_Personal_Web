function LatestDay() {
   var yr=2020;
   var mon=1;
   var day=10;
   var jday=dayofyear(yr, mon, day);
   var UpperLimit=1000*yr+jday;
   var status=save_latest_date(yr,mon,day);
   return UpperLimit;
}
function FirstDay() {
   var Fstyr=2015;
   var Fstmon=8;
   var Fstday=01;
   var Fstjday=dayofyear(Fstyr, Fstmon, Fstday);
   var LowerLimit=1000*Fstyr+Fstjday;
   return LowerLimit;
}

