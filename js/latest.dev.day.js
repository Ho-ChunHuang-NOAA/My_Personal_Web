function LatestDay() {
   var yr=2020;
   var mon=7;
   var day=20;
   var jday=dayofyear(yr, mon, day);
   var UpperLimit=1000*yr+jday;
   var status=save_latest_date(yr,mon,day);
   return UpperLimit;
}
function FirstDay() {
   var Fstyr=2014;
   var Fstmon=7;
   var Fstday=01;
   var Fstjday=dayofyear(Fstyr, Fstmon, Fstday);
   var LowerLimit=1000*Fstyr+Fstjday;
   return LowerLimit;
}

