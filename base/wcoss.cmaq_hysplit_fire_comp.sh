#!/bin/bash
module load prod_util/1.1.6

## This script will be called from /data/data003/hhuang/code/edraot_viirs_gridded/plot_edraot_daily_avg.pro
## Will be using the same day as input
## machine=`hostname | cut -d'.' -f1`
## echo $machine
if [[ $# < 1 ]]; then
   TODAY=`date +%Y%m%d`
else
   TODAY=$1
fi
if [[ $# < 2 ]]; then
   exp=prod
else
   exp=$2
fi
#
version=hms2cmaq
FIRST_AVAIL_DAY=20150801
FstY0=`echo ${FIRST_AVAIL_DAY} | cut -c1-4`
X0=`echo ${FIRST_AVAIL_DAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   FstMx=`echo ${FIRST_AVAIL_DAY} | cut -c6-6`
else
   FstMx=`echo ${FIRST_AVAIL_DAY} | cut -c5-6`
fi
FstD0=`echo ${FIRST_AVAIL_DAY} | cut -c7-8`
#
## Local  Source Directory
local_src=/lfs/h2/emc/physics/noscrub/${USER}/WEB
local_base=${local_src}/base
local_html=${local_src}/html
local_js=${local_src}/js
local_inc=${local_src}/includes

## Remote Login Information
remote_machine=emcrzdm.ncep.noaa.gov
remote_user=hchuang
## Remote Target Directory
remote_src=/home/people/emc/www/htdocs/mmb/hchuang/web
remote_http=http://www.emc.ncep.noaa.gov/mmb/hchuang/web
remote_html=${remote_src}/html
remote_js=${remote_src}/js
remote_inc=${remote_src}/includes

remote_fig=${remote_src}/fig
WebFig=${remote_http}/fig

declare -a str=( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec )
Y0=`echo ${TODAY} | cut -c1-4`
X0=`echo ${TODAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   Mx=`echo ${TODAY} | cut -c6-6`
else
   Mx=`echo ${TODAY} | cut -c5-6`
fi
D0=`echo ${TODAY} | cut -c7-8`
cdate=${TODAY}"00"
TOMORROW=$(${NDATE} +24 ${cdate}| cut -c1-8)
#
# If starting figure is not existed due to any reason,e.g., server down,  do not update the time info of the html and js
#
## Can not check remote file. Keep foe local usage
#
## if [[ -e ${remote_fig}/${Y0}/${TODAY}/hysplitconussmokepbl_03.png ]]; then
if [ 1 -eq 1 ]; then

   chrstr=${str[${Mx}-1]}   ## keyword for Month

   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!HYSPLITHMSIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hmsfire.conus.${exp}.${TODAY}.t06z.location.day0.k1.png!"  -e "s!CMAQHMSIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/cmaqhmsfire.conus.hms2cmaq.${TODAY}.t06z.location.day0.k1.png!" ${local_base}/cmaq_hysplit_fire_comp.base > ${local_html}/cmaq_hysplit_fire_comp.html
   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPRODIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/cmaqconussmokepbl_03.gif!"  -e "s!CMAQDEVIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/cmaqconussmokepbl_03_hms2cmaq!" -e "s!NESDISIMAGE!${WebFig}/${Y0}/${TODAY}/nesdisconussmokepbl_11.gif!" -e "s!FIRE1IMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hmsfire.conus.prod.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIRE2IMAGE!${WebFig}/${Y0}/${TODAY}/t06z/cmaqhmsfire.conus.hms2cmaq.${TODAY}.t06z.location.day0.k1.png!" ${local_base}/cmaq_bluesky_${version}.base > ${local_html}/cmaq_bluesky_${version}.html
   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!CCCC!${D0}!"  -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" -e "s!ZZZZ!${FstD0}!" ${local_js}/cmaq_hms_latest.day.js.base > ${local_js}/cmaq_hms_latest.day.js

else
   echo " No figure of slected date existed ${remote_fig}/${Y0}/${TODAY}/t06z/hmsfire.na.para.${TODAY}.t06z.01.pm25.k1.png"
fi

scp ${local_html}/cmaq_hysplit_fire_comp.html ${remote_user}@${remote_machine}:${remote_html}
scp ${local_html}/cmaq_bluesky_${version}.html ${remote_user}@${remote_machine}:${remote_html}
scp ${local_js}/cmaq_hms_latest.day.js ${remote_user}@${remote_machine}:${remote_js}
scp ${local_js}/cmaq_hysplit_fire_comp.js ${remote_user}@${remote_machine}:${remote_js}/cmaq_hysplit_fire_comp.js
scp ${local_js}/cmaq_bluesky_${version}.js ${remote_user}@${remote_machine}:${remote_js}/cmaq_bluesky_${version}.js
exit
